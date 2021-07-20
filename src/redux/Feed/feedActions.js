import {
  FETCH_FEEDS_ERROR,
  FETCH_FEEDS_REQUEST,
  FETCH_FEEDS_SUCCESS,
} from "./feedTypes";
import axios from "axios";
import { useSelector } from "react-redux";

function fetchFeedsRequest() {
  return {
    type: FETCH_FEEDS_REQUEST,
  };
}

function fetchFeedsSuccess(feedData) {
  return {
    type: FETCH_FEEDS_SUCCESS,
    payload: feedData,
  };
}

function fetchFeedsError(msg, status, id) {
  return {
    type: FETCH_FEEDS_ERROR,
    payload: { msg, status, id },
  };
}

export default function fetchFeeds(placeName) {
  return (dispatch, getState) => {
    const token = getState().auth.token;

    dispatch(fetchFeedsRequest());
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    config.headers["AUTH_TOKEN"] = token;
    if (findParams(placeName) == null) {
      axios
        .get(`/api/data/`, config)
        .then((res) => dispatch(fetchFeedsSuccess(res.data)))
        .catch((err) =>
          dispatch(
            fetchFeedsError(
              err.response.message,
              err.response.status,
              "SERVER_FAILURE"
            )
          )
        );
    } else {
      axios
        .get(`/api/data/${findParams(placeName)}`, config)
        .then((res) => dispatch(fetchFeedsSuccess(res.data)))
        .catch((err) =>
          dispatch(
            fetchFeedsError(
              err.response.message,
              err.response.status,
              "SERVER_FAILURE"
            )
          )
        );
    }
  };
}

function findParams(placeName) {
  console.log("Entered");
  console.log(placeName);
  if (placeName.length !== 0) return placeName;
  else return null;
}
