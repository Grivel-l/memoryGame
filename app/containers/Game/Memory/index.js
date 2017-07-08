import {connect} from 'react-redux';

import Memory from '../../../components/Game/Memory/index';
import {GAME_TILE_RESET_PRESSED} from '../../../actions/Game/tile';
import {getPressedTiles} from '../../../selectors/Game/game';

const mapStateToProps = state => {
  return {
    pressedTiles: getPressedTiles(state)
  };
};

const mapDispatchToProps = dispatch => ({
  resetPressed: () => dispatch({type: GAME_TILE_RESET_PRESSED})
});

export default connect(mapStateToProps, mapDispatchToProps)(Memory);
