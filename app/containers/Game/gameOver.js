import {connect} from 'react-redux';

import GameOver from '../../components/Game/GameOver';
import {REDIRECT_MAIN_MENU} from '../../actions/App/redirect';

const mapDispatchToProps = dispatch => ({
  redirect: place => dispatch({type: REDIRECT_MAIN_MENU, payload: {place}})
});

export default connect(null, mapDispatchToProps)(GameOver);
