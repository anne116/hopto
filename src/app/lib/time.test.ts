import { describe, it, expect } from "vitest";
import { DateTime } from "luxon";
import { buildTonightWindow, buildWeekWindow, buildMonthWindow } from "./time";

const TimeZone = "America/Toronto";

describe("time windows", () => {
  it("Tonight: from now to end of day", () => {
    const fixed = DateTime.fromISO("2025-08-18T21:30", { zone: TimeZone });
    const window = buildTonightWindow(fixed);
    expect(window.startISO).toContain("2025-08-18T21:30");
    expect(window.endISO).toContain("2025-08-18T23:59");
  });

  it("Week: from start of day to 7 days from now", () => {
    const fixed = DateTime.fromISO("2025-08-18T21:30", { zone: TimeZone });
    const window = buildWeekWindow(fixed);
    expect(window.startISO).toContain("2025-08-18T00:00");
    expect(window.endISO).toContain("2025-08-25T23:59");
  });

  it("Month: from start of month to end of month", () => {
    const fixed = DateTime.fromISO("2025-08-18T21:30", { zone: TimeZone });
    const window = buildMonthWindow(fixed);
    expect(window.startISO).toContain("2025-08-01T00:00");
    expect(window.endISO).toContain("2025-08-31T23:59");
  });
});
