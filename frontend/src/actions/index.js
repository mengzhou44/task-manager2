import * as types from "./types";

export const  setAuthenticated = (authenticated) => {
    return { type: types.SET_AUTHENTICATED, payload: authenticated};
  };
  