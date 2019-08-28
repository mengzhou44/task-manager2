import * as types from '../actions/types';

const INITIAL_STATE = {
  authenticated: false
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_AUTHENTICATED:
      return {
        authenticated: action.payload
      };

    default:
      return state;
  }
};
