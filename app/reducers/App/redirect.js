import {
  REDIRECT_MAIN_MENU,
  REDIRECT_RESET
} from '../../actions/App/redirect';

const initialState = {
  redirection: null
};

const redirect = (state = initialState, {type, payload}) => {
  switch(type) {
    case REDIRECT_MAIN_MENU:
      return {
        ...state,
        redirection: payload.place
      };
    case REDIRECT_RESET:
      return {
        ...state,
        redirection: null
      }
    default:
      return state;
  }
};

export default redirect;
