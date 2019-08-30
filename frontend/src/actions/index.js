import * as types from "./types";

export const  onSignInSuccess = (token) => {
    return { type: types.SIGN_IN_SUCCESS, payload: token};
  };
  
export const  onSignOutSuccess = () => {
    return { type: types.SIGN_OUT_SUCCESS};
  };