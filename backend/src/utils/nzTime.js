// Slot dates/times are entered and displayed in NZ local time (the business operates surf
// lessons in New Zealand) but must be compared against true UTC (UTC_TIMESTAMP(), with the
// db pool's `timezone: 'Z'`) for the 24h cancel/reschedule window. NZ observes DST (NZST
// UTC+12 / NZDT UTC+13), so the offset can't be hardcoded — it's looked up via Intl for the
// specific instant, which resolves the current IANA rules without adding a timezone library.
const NZ_TZ = 'Pacific/Auckland';

const nzOffsetMinutes = (instant) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: NZ_TZ,
    timeZoneName: 'shortOffset',
  }).formatToParts(instant);
  const offsetPart = parts.find((p) => p.type === 'timeZoneName').value; // e.g. "GMT+13"
  const [, sign, hours, minutes] = offsetPart.match(/GMT([+-])(\d+)(?::(\d+))?/);
  return (sign === '-' ? -1 : 1) * (Number(hours) * 60 + Number(minutes ?? 0));
};

// Converts an NZ-local wall-clock date+time into the true UTC instant it represents. Two
// passes: the first offset lookup is against the naive (mislabeled) instant, which can pick
// the wrong side of a DST transition if the wall-clock time falls within the transition's own
// hour; the second pass re-checks the offset at the corrected instant, resolving that. (The
// one case no amount of passes can resolve is a wall-clock time that's skipped or repeated
// during the transition itself — an inherent ambiguity, not a bug — but that's 2-3am NZ time,
// when no surf lesson is ever booked.)
export const nzWallClockToUtc = (date, time) => {
  const naiveUtc = new Date(`${date}T${time}Z`); // placeholder instant, off by the NZ offset
  const firstPass = new Date(naiveUtc.getTime() - nzOffsetMinutes(naiveUtc) * 60 * 1000);
  return new Date(naiveUtc.getTime() - nzOffsetMinutes(firstPass) * 60 * 1000);
};

// Cancel/reschedule tokens expire 24h before the session starts, closing the client
// self-service window (matches the confirmed 24h refund/reschedule business rule).
export const cancelWindowExpiry = (date, time) =>
  new Date(nzWallClockToUtc(date, time).getTime() - 24 * 60 * 60 * 1000);
