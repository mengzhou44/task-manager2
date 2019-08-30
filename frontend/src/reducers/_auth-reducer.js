import * as types from '../actions/types';

const INITIAL_STATE = {
  authenticated: false,
  token: ''
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SIGN_IN_SUCCESS:
      return {
        authenticated: true,
        token:  action.payload
      };

   case types.SIGN_OUT_SUCCESS:
        return INITIAL_STATE;

    default:
      return state;
  }
};
