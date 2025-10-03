import React, { useEffect, useMemo, useRef, useState } from "react";

type ContributionCell = {
  date: string;    // YYYY-MM-DD
  count: number;   // o günkü katkı sayısı
  level: number;   // 0..4
  column: number;  // 1-based week index
  row: number;     // 1..7 (Pazar=1)
};

type CalendarStats = {
  total: number;
  longestStreak: number;
  currentStreak: number;
};

const defaultStats: CalendarStats = { total: 0, longestStreak: 0, currentStreak: 0 };
const palette = [0, 1, 2, 3, 4] as const;

type RawWeek = { contributionDays?: RawDay[]; days?: RawDay[]; firstDay?: string };
type RawDay = {
  date?: string;
  count?: number;
  contributionsCount?: number;
  contributionCount?: number;
  contribution_count?: number;
  total?: number;
  level?: number;
  intensity?: number;
  colorIndex?: number;
  contributionLevel?: number;
  weekday?: number;
};

function formatNumber(value: number) {
  return value.toLocaleString();
}

function deriveStats(days: ContributionCell[]): CalendarStats {
  if (!days.length) return defaultStats;

  const sorted = [...days].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let total = 0;
  let longest = 0;
  let current = 0;
  let running = 0;

  for (const day of sorted) {
    total += day.count;
    if (day.count > 0) {
      running += 1;
      if (running > longest) longest = running;
    } else {
      running = 0;
    }
  }

  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i].count > 0) current += 1;
    else break;
  }

  return { total, longestStreak: longest, currentStreak: current };
}

export default function GithubContributionCalendar({
  username = "gizemtuguz",
  className = "",
  showStats = true,
  loadingText = "Fetching contributions…",
  errorText = "Unable to load GitHub activity right now. Please try again later.",
}: {
  username?: string;
  className?: string;
  showStats?: boolean;
  loadingText?: string;
  errorText?: string;
}) {
  const [cells, setCells] = useState<ContributionCell[]>([]);
  const [stats, setStats] = useState<CalendarStats>(defaultStats);
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    (async () => {
      setState("loading");
      try {
        const { cells: parsedCells, stats: derived } = await resolveContributionData(
          username,
          controller.signal
        );
        setCells(parsedCells);
        setStats(derived);
        setState("idle");
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Failed to load GitHub contributions", err);
          setCells([]);
          setStats(defaultStats);
          setState("error");
        }
      }
    })();

    return () => controller.abort();
  }, [username]);

  const hasData = cells.length > 0;

  const ariaLabel = useMemo(
    () => `GitHub contribution calendar for ${username}`,
    [username]
  );

  if (state === "loading") {
    return (
      <div className={`github-calendar ${className}`} aria-live="polite">
        <div className="github-calendar__loading">{loadingText}</div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className={`github-calendar ${className}`} aria-live="polite">
        <div className="github-calendar__error">{errorText}</div>
      </div>
    );
  }

  return (
    <div className={`github-calendar ${className}`} aria-live="polite">
      {showStats && (
        <div className="github-calendar__stats" role="group" aria-label="Contribution stats">
          <div className="github-calendar__stat">
            <span className="github-calendar__stat-label">Contributions in the last year</span>
            <span className="github-calendar__stat-value">{formatNumber(stats.total)}</span>
          </div>
          <div className="github-calendar__stat">
            <span className="github-calendar__stat-label">Longest streak</span>
            <span className="github-calendar__stat-value">{stats.longestStreak} days</span>
          </div>
          <div className="github-calendar__stat">
            <span className="github-calendar__stat-label">Current streak</span>
            <span className="github-calendar__stat-value">{stats.currentStreak} days</span>
          </div>
        </div>
      )}

      {hasData ? (
        <>
          <div className="github-calendar__grid" role="img" aria-label={ariaLabel}>
            {cells.map((day) => {
              const safeLevel = palette.includes(day.level as (typeof palette)[number])
                ? day.level
                : 0;
              return (
                <span
                  key={day.date}
                  className={`github-calendar__day github-calendar__day--level-${safeLevel}`}
                  style={{ gridColumn: String(day.column), gridRow: String(day.row) }}
                  title={`${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`}
                  aria-label={`${day.date}, ${day.count} contribution${day.count === 1 ? "" : "s"}`}
                />
              );
            })}
          </div>

          <div className="github-calendar__legend" aria-hidden="false" role="group" aria-label="Legend">
            <div className="github-calendar__legend-scale">
              {palette.map((level) => (
                <span
                  key={level}
                  className={`github-calendar__legend-cell github-calendar__day--level-${level}`}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="github-calendar__empty">No public contributions found for this period.</div>
      )}
    </div>
  );
}

/* -------------------- Data Layer -------------------- */

async function resolveContributionData(
  username: string,
  signal?: AbortSignal
): Promise<{ cells: ContributionCell[]; stats: CalendarStats }> {
  // Deneme sırası: Jogruber v4 → Vercel bridge → GitHub HTML (proxy)
  const attempts: Array<() => Promise<ContributionCell[]>> = [
    () => fetchFromJogruber(username, signal),
    () => fetchFromVercel(username, signal),
    () => fetchFromGitHub(username, signal),
  ];

  for (const attempt of attempts) {
    try {
      const cells = await attempt();
      if (cells.length) return { cells, stats: deriveStats(cells) };
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("Contribution source failed", err);
    }
  }
  throw new Error("All contribution sources failed");
}

type JogruberResp = {
  total?: Record<string, number>;
  contributions?: { date: string; count: number; level: number }[];
};

async function fetchFromJogruber(
  username: string,
  signal?: AbortSignal
): Promise<ContributionCell[]> {
  const url = `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(
    username
  )}?y=last`;
  const res = await fetch(url, { headers: { Accept: "application/json" }, signal });
  if (!res.ok) throw new Error(`Jogruber responded with ${res.status}`);

  const data: JogruberResp = await res.json();
  const list = Array.isArray(data?.contributions) ? data.contributions : [];
  if (!list.length) return [];

  const parseUTC = (s: string) => {
    const d = new Date(`${s}T00:00:00Z`);
    return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  };
  const dates = list.map((c) => parseUTC(c.date)).sort((a, b) => a.getTime() - b.getTime());
  const min = dates[0];
  const calendarStart = new Date(min);
  // GitHub takvimi Pazar başlar → önceki Pazar’a çek
  calendarStart.setUTCDate(calendarStart.getUTCDate() - calendarStart.getUTCDay());

  const daysBetween = (a: Date, b: Date) =>
    Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));

  return list.map((item) => {
    const d = parseUTC(item.date);
    const col = Math.floor(daysBetween(calendarStart, d) / 7) + 1; // 1-based
    const row = d.getUTCDay() + 1; // 1..7
    const lvl = clamp(Number(item.level) || 0, 0, 4);
    return { date: item.date, count: item.count || 0, level: lvl, column: col, row };
  });
}

async function fetchFromVercel(username: string, signal?: AbortSignal): Promise<ContributionCell[]> {
  const res = await fetch(
    `https://github-contributions.vercel.app/api/v1/${encodeURIComponent(username)}`,
    { headers: { Accept: "application/json" }, signal }
  );
  if (!res.ok) throw new Error(`Vercel bridge responded with ${res.status}`);
  const payload = await res.json();

  const weeks: RawWeek[] = Array.isArray(payload?.weeks)
    ? payload.weeks
    : Array.isArray(payload?.years)
    ? (() => {
        const years = payload.years
          .map((y: { year?: number; weeks?: RawWeek[] }) => y)
          .sort((a: { year?: number }, b: { year?: number }) => (b.year ?? 0) - (a.year ?? 0));
        const latest = years[0];
        return latest?.weeks ?? [];
      })()
    : [];

  if (!weeks.length) return [];
  const cells = buildCellsFromWeeks(weeks);
  return cells;
}

async function fetchFromGitHub(username: string, signal?: AbortSignal): Promise<ContributionCell[]> {
  const rangeEnd = new Date();
  const rangeStart = new Date(rangeEnd);
  rangeStart.setDate(rangeStart.getDate() - 365);

  const fmt = (d: Date) => {
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  // public CORS proxy (kararsız olabilir) – son çare
  const url = `https://cors.isomorphic-git.org/https://github.com/users/${encodeURIComponent(
    username
  )}/contributions?from=${fmt(rangeStart)}&to=${fmt(rangeEnd)}`;

  const res = await fetch(url, { headers: { "x-requested-with": "XMLHttpRequest" }, signal });
  if (!res.ok) throw new Error(`GitHub HTML responded with ${res.status}`);
  const markup = await res.text();

  const parser = typeof window !== "undefined" ? new window.DOMParser() : null;
  if (!parser) throw new Error("DOMParser unavailable");
  const doc = parser.parseFromString(markup, "text/html");
  const rects = Array.from(doc.querySelectorAll<SVGRectElement>("rect[data-date]"));
  if (!rects.length) return [];

  const cells = rects
    .map((rect, idx) => {
      const date = rect.getAttribute("data-date");
      if (!date) return null;
      const count = Number(rect.getAttribute("data-count") ?? "0");
      const levelAttr = rect.getAttribute("data-level") ?? rect.getAttribute("data-intensity") ?? "0";
      const level = clamp(Number(levelAttr), 0, 4);
      const column = Math.floor(idx / 7) + 1;
      const row = (idx % 7) + 1;
      return { date, count: Number.isFinite(count) ? count : 0, level, column, row } as ContributionCell;
    })
    .filter(Boolean) as ContributionCell[];

  return cells;
}

function buildCellsFromWeeks(weeks: RawWeek[]): ContributionCell[] {
  const out: ContributionCell[] = [];
  weeks.forEach((week, w) => {
    const days = week.contributionDays ?? week.days ?? [];
    days.forEach((day, d) => {
      const date = day?.date;
      if (!date) return;
      const countCandidate =
        day.count ??
        day.contributionCount ??
        day.contributionsCount ??
        day.contribution_count ??
        day.total ??
        0;
      const levelCandidate =
        day.level ?? day.intensity ?? day.colorIndex ?? day.contributionLevel ?? 0;

      const count = Number.isFinite(Number(countCandidate)) ? Number(countCandidate) : 0;
      const level = clamp(Number(levelCandidate), 0, 4);
      const row = typeof day.weekday === "number" ? day.weekday + 1 : d + 1;

      out.push({ date, count, level, column: w + 1, row });
    });
  });
  return out;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}
