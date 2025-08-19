import { DateTime } from "luxon";

const TimeZone = "America/Toronto";
export type TimeWindow = { startISO: string; endISO: string };

export function nowToronto(): DateTime {
  return DateTime.now().setZone(TimeZone);
}

export function buildTonightWindow(now = nowToronto()): TimeWindow {
  const start = now.startOf("minutes");
  const end = now.endOf("day");
  return {
    startISO: start.toISO(),
    endISO: end.toISO(),
  };
}

export function buildWeekWindow(now = nowToronto()): TimeWindow {
  const start = now.startOf("Day");
  const end = start.plus({ days: 7 }).endOf("day");
  return {
    startISO: start.toISO(),
    endISO: end.toISO(),
  };
}

export function buildMonthWindow(now = nowToronto()): TimeWindow {
  const start = now.startOf("month");
  const end = now.endOf("month");
  return {
    startISO: start.toISO(),
    endISO: end.toISO(),
  };
}

export function formatRangeHuman({ startISO, endISO }: TimeWindow): string {
  const start = DateTime.fromISO(startISO).setZone(TimeZone);
  const end = DateTime.fromISO(endISO).setZone(TimeZone);
  if (start.hasSame(end, "day"))
    return `{start.toFormat("EEE, MMM d")} (today)`;
  return `${start.toFormat("EEE, MMM d")} - ${end.toFormat("EEE, MMM d")}`;
}
