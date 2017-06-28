import {connect} from 'react-redux';

import Tile from '../../components/Game/Tile';
import {GAME_TILE_PRESSED} from '../../actions/Game/tile';

const mapDispatchToProps = dispatch => ({
  tilePressed: id => dispatch({type: GAME_TILE_PRESSED, payload: {id}})
});

export default connect(null, mapDispatchToProps)(Tile);
