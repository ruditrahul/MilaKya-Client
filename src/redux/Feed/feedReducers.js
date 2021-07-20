import {
  FETCH_FEEDS_ERROR,
  FETCH_FEEDS_REQUEST,
  FETCH_FEEDS_SUCCESS,
} from "./feedTypes";

const initialState = {
  loading: false,
  user: [],
  error: "",
};

export default function feedReducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_FEEDS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_FEEDS_SUCCESS: {
      return {
        loading: false,
        user: action.payload,
      };
    }
    case FETCH_FEEDS_ERROR: {
      return {
        loading: false,
        user: [],
        error: action.payload,
      };
    }
    default:
      return state;
  }
}
