// date formatting for month and year (e.g., "January 20XX")
export function formatMonthYear(dateString) {
  const date = new Date(dateString);
  return `${date.toLocaleString("en-US", {
    month: "long",
  })} ${date.getFullYear()}`;
}

// date formatting for full date with time (e.g., "January 01, 20XX, 1X:XX AM/PM")
export function formatFullDate(dateString) {
  const date = new Date(dateString);
   return `${date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}`;
}
