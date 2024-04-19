export function formatDateLong(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "2-digit",
    month: "long",
  };
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", options).format(date);
}

export function formatTimeShort(timeString: string): string {
  const [hours] = timeString.split(":").map(Number);
  const period = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${formattedHours}${period}`;
}

export function formatDayAbbrev(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { weekday: "short" };
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export function formatDateNumeric(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day}/${month}`;
}
