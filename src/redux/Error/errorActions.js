import { GET_ERRORS, CLEAR_ERRORS } from "./errorTypes";

export function returnErrors(msg, status, id) {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id },
  };
}

// CLEAR ERRORS
export function clearErrors() {
  return {
    type: CLEAR_ERRORS,
  };
}
