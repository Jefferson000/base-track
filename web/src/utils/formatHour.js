const formatHour = (timeString) => {
  if (!timeString) return timeString;

  // Get today's date and merge with timeString
  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
  const date = new Date(`${today}T${timeString}Z`); // Construct ISO string

  if (isNaN(date)) return "Invalid Date";

  // Extract hours and minutes directly from the Date object
  let hours = date.getUTCHours(); // Use UTC hours to avoid timezone issues
  let minutes = date.getUTCMinutes();

  // Round minutes to the nearest 10
  minutes = Math.round(minutes / 10) * 10;
  if (minutes === 60) {
    minutes = 0;
    hours = (hours + 1) % 24;
  }

  // Convert to 12-hour format and determine AM/PM
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format

  // Pad minutes with leading zero if necessary
  minutes = minutes.toString().padStart(2, "0");

  return `${hours}:${minutes}${ampm}`;
};

export { formatHour };