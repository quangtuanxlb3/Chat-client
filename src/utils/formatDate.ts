export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);

  const pad = (n: number) => n.toString().padStart(2, "0");

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // tháng bắt đầu từ 0
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day}/${month}/${year}`;
}
