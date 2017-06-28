import {
  GAME_TILE_PRESSED
} from '../../actions/Game/tile';

const initialState = {
  tilesPressed: []
};

const app = (state = initialState, {type, payload}) => {
  switch(type) {
    case GAME_TILE_PRESSED:
      console.log('Payload', payload);
      return {
        ...state,
        tilesPressed: [
          ...state.tilesPressed,
          ...Object.values(payload)
        ]
      };
    default:
      return state;
  }
};

export default app;
