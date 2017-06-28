import {connect} from 'react-redux';

import Game from '../../components/Game/index';
import {getPressedTiles} from '../../selectors/Game/game';

const mapStateToProps = state => {
  return {
    pressedTiles: getPressedTiles(state)
  };
};

export default connect(mapStateToProps)(Game);
