// Shared lists used by the admin forms and server actions.
export const CATEGORIES: string[] = ["Web Application", "Client Work", "Community", "Tools"];
export const STATUSES: string[] = ["live", "in_development", "planned"];
export const VISIBILITIES: string[] = ["draft", "published", "archived"];
export const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
