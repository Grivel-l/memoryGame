import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Tile from './Tile';
import GlobalStyle from '../../globalStyles';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 1
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.level !== nextState.level;
  }

  renderEachTile(j) {
    const tiles = [];
    for (let i = 0; i < this.state.level; i += 1) {
      tiles.push(
        <Tile
          key={`Tile${i}${j}`}
        />
      );
    }

    return tiles;
  }

  renderTiles() {
    const tiles = [];
    for (let i = 0; i < this.state.level; i += 1) {
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
      <View style={styles.wrapper}>
        {this.renderTiles()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 10,
    flexDirection: 'row'
  }
});

export default Game;
