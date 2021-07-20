import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./authTypes";
import axios from "axios";
import { returnErrors } from "../Error/errorActions";

export function loadUser() {
  return (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    axios
      .get("/api/auth/user", tokenConfig(getState))
      .then((res) =>
        dispatch({
          type: USER_LOADED,
          payload: res.data,
        })
      )
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
          type: AUTH_ERROR,
        });
      });
  };
}

export function register({ name, email, password }) {
  return (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({ name, email, password });

    axios
      .post("/api/auth/register", body, config)
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
        dispatch(loadUser());
      })
      .catch((err) => {
        dispatch(
          returnErrors(
            err.response.data.message,
            err.response.status,
            "REGISTER_FAIL"
          )
        );
        dispatch({
          type: REGISTER_FAIL,
        });
      });
  };
}

export function login({ email, password }) {
  return (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({ email, password });

    axios
      .post("/api/auth/login", body, config)
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response.data, err.response.status);
        dispatch(
          returnErrors(
            err.response.data.message,
            err.response.status,
            "LOGIN_FAIL"
          )
        );
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  };
}

export function logout() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["AUTH_TOKEN"] = token;
  }

  return config;
};
