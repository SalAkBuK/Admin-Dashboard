export function formatDateToPKT(dateString) {
 
  const date = new Date(dateString);

  date.setHours(date.getHours());

 
  return `${date.toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // Use 12-hour format (AM/PM)
    timeZone: "Asia/Karachi",
  })}`;
}
