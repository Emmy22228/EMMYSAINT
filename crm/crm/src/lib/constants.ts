export const LEAD_STATUSES: { value: string; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "in_progress", label: "In progress" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
  { value: "archived", label: "Archived" },
];

export const CLOSED_STATUSES = ["won", "lost", "archived"];

export function statusLabel(value: string): string {
  return LEAD_STATUSES.find((s) => s.value === value)?.label ?? value;
}
