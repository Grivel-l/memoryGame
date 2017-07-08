import React, {Component} from 'react';
import {View} from 'react-native';

import Tile from '../../containers/Game/tile';

class RenderTiles extends Component {
  constructor(props) {
    super(props);
  }

  renderEachTile(j) {
    const tiles = [];
    for (let i = 0; i < this.props.tilesNbr; i += 1) {
      tiles.push(
        <Tile
          highlight={this.props.highlights[`${i}${j}`]}
          launched={this.props.launched}
          id={`${i}${j}`}
          key={`Tile${i}${j}`}
        />
      );
    }

    return tiles;
  }

  renderTiles() {
    const tiles = [];
    for (let i = 0; i < this.props.tilesNbr; i += 1) {
      tiles.push(
        <View
          style={{flex: 1, alignSelf: 'stretch'}}
          key={`Line${i}`}
        >
          {this.renderEachTile(i)}
        </View>
      )
    }

    return tiles;
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        {this.renderTiles()}
      </View>
    );
  }
}

export default RenderTiles;
