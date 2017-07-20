import {connect} from 'react-redux';

import App from '../components/App';
import {getRedirect} from '../selectors/app';
import {REDIRECT_RESET} from '../actions/App/redirect';

const mapStateToProps = state => {
  return {
    redirection: getRedirect(state)
  };
};

const mapDispatchToProps = dispatch => ({
  resetRedirect: () => dispatch({type: REDIRECT_RESET})
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
