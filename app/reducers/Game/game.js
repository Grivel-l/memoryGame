import {
  GAME_TILE_PRESSED,
  GAME_TILE_RESET_PRESSED
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
    case GAME_TILE_RESET_PRESSED:
      return {
        ...state,
        tilesPressed: initialState.tilesPressed
      };
    default:
      return state;
  }
};

export default app;
