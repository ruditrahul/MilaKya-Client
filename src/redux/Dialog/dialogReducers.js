import { OPEN_DIALOG, CLOSE_DIALOG } from "./dialogTypes";

const initialState = {
  isOpen: false,
};

export default function dialogReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_DIALOG:
      return {
        ...state,
        isOpen: true,
      };
    case CLOSE_DIALOG:
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
}
