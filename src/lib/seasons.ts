// Competitions and results, organised by season. A season ends with the yearly
// RoboCup and the next one starts the day after (DESIGN.md, section 1).
// Scores are written ours first. Every match is listed, wins and losses alike.

export type Match = {
  stage: string;
  opponent: string;
  us: number;
  them: number;
  note?: string; // e.g. "after penalties"
};

export type Competition = {
  id: string;
  name: string;
  place: string;
  dateLabel: string; // "Aug 2026"
  date: string; // ISO, first day
  // For a competition still to be played: the days, shown in the result column ("23 to 25 Oct").
  dates?: string;
  detail?: string;
  // Finishing position as a short figure for `.t-result` ("3rd", "4th", "QF"),
  // plus the word that follows it. Omit for competitions still to be played.
  placing?: { figure: string; word: string };
  // Still to be played: listed first in its season, marked with the orange bar.
  upcoming?: boolean;
  division?: string;
  newsSlug?: string;
  matches?: Match[];
};

export type Season = {
  id: string; // "2026-27"
  label: string; // "Season 2026/27"
  start: string; // ISO date the season starts (the day after RoboCup ends)
  competitions: Competition[]; // upcoming first, then newest first
};

export const seasons: Season[] = [
  {
    id: "2026-27",
    label: "Season 2026/27",
    start: "2026-07-07",
    competitions: [
      {
        id: "italian-open-2026",
        name: "RoboCup Italian Open 2026",
        place: "Rome",
        dateLabel: "Oct 2026",
        date: "2026-10-23",
        dates: "23 to 25 Oct",
        detail: "23 to 25 October, Humanoid Soccer League, Middle Division, at Maker Faire Rome.",
        division: "Middle Division",
        upcoming: true,
      },
      {
        id: "whrg-2026",
        name: "World Humanoid Robot Games 2026",
        place: "Beijing",
        dateLabel: "Aug 2026",
        date: "2026-08-24",
        detail: "5v5 Middle Division, 16 teams, knockout.",
        placing: { figure: "3rd", word: "place" },
        division: "5v5 Middle Division",
        matches: [
          { stage: "Round of 16", opponent: "SC ROB-X", us: 11, them: 1 },
          { stage: "Quarter-final", opponent: "Yuxin Zhanqing", us: 11, them: 0 },
          { stage: "Semi-final", opponent: "HTWK Robots", us: 0, them: 11 },
          { stage: "Third place", opponent: "HyperYe", us: 3, them: 1 },
        ],
      },
    ],
  },
  {
    id: "2025-26",
    label: "Season 2025/26",
    start: "2025-07-21",
    competitions: [
      {
        id: "robocup-2026",
        name: "RoboCup 2026",
        place: "Incheon",
        dateLabel: "Jul 2026",
        date: "2026-06-30",
        detail: "First edition of the Humanoid Soccer League, Middle Division.",
        placing: { figure: "4th", word: "place" },
        division: "Middle Division",
        newsSlug: "2026-07-02-robocup-fourth-place",
        matches: [
          { stage: "Round 1", opponent: "RedbackBots", us: 8, them: 1 },
          { stage: "Round 2", opponent: "HTWK Robots", us: 1, them: 8 },
          { stage: "Round 3", opponent: "Inha-United", us: 10, them: 0 },
          { stage: "Round 4", opponent: "RoboRoos", us: 4, them: 2 },
          { stage: "Round 5", opponent: "B-Human", us: 1, them: 11 },
          { stage: "Play-in", opponent: "RoboEireann", us: 7, them: 0 },
          { stage: "Semi-final", opponent: "B-Human", us: 0, them: 9 },
          { stage: "Third place", opponent: "Rhoban", us: 2, them: 9 },
        ],
      },
      {
        id: "german-open-2026",
        name: "RoboCup German Open 2026",
        place: "Cologne",
        dateLabel: "Mar 2026",
        date: "2026-03-10",
        detail: "Two weeks with the robots and we got on the podium.",
        placing: { figure: "3rd", word: "place" },
        division: "Middle Division",
        newsSlug: "2026-03-14-german-open-third-place",
        matches: [
          { stage: "Round robin", opponent: "Ruhrbot Devils", us: 0, them: 0 },
          { stage: "Round robin", opponent: "B-Human", us: 0, them: 10 },
          { stage: "Round robin", opponent: "HTWK Robots", us: 0, them: 6 },
          { stage: "Round robin", opponent: "Berlin United", us: 8, them: 1 },
          { stage: "Round robin", opponent: "HULKs", us: 0, them: 0 },
          { stage: "Play-in", opponent: "HULKs", us: 1, them: 0, note: "after penalties" },
          { stage: "Semi-final", opponent: "HTWK Robots", us: 0, them: 10 },
          { stage: "Third place", opponent: "Ruhrbot Devils", us: 5, them: 0 },
        ],
      },
      {
        id: "whrg-2025",
        name: "World Humanoid Robot Games 2025",
        place: "Beijing",
        dateLabel: "Aug 2025",
        date: "2025-08-14",
        detail: "Our first international competition with the new team.",
        placing: { figure: "QF", word: "quarter-finals" },
        newsSlug: "2025-08-15-world-humanoid-robot-games-quarter-finals",
      },
    ],
  },
];

/** The season a date falls in, by the season start dates above. */
export function seasonOf(date: string | Date): Season {
  const t = new Date(date).getTime();
  const sorted = [...seasons].sort((a, b) => b.start.localeCompare(a.start));
  return sorted.find((s) => t >= new Date(s.start).getTime()) ?? sorted[sorted.length - 1];
}

export function competitionForNews(slug: string): Competition | undefined {
  for (const s of seasons) {
    const c = s.competitions.find((c) => c.newsSlug === slug);
    if (c) return c;
  }
  return undefined;
}

/** The most recent competition that has a match report. */
export function latestReport(): Competition | undefined {
  for (const s of seasons) {
    const c = s.competitions.find((c) => c.newsSlug);
    if (c) return c;
  }
  return undefined;
}
