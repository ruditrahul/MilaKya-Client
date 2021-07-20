import { OPEN_DIALOG, CLOSE_DIALOG } from "./dialogTypes";

export function openDialog() {
  return {
    type: OPEN_DIALOG,
  };
}

export function closeDialog() {
  return {
    type: CLOSE_DIALOG,
  };
}
