import { JsonValue } from "./types";

export const getIsKeyClickable = (data: JsonValue) => {
  // When is Array it is not clickable
  if (typeof data === 'object' && Array.isArray(data)) {
    return false;
  }

  // When is Object it is not clickable
  if (typeof data === 'object' && data !== null) {
    return false;
  }

  return true;
};
