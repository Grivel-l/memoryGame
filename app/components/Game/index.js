import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Tile from './Tile';
import GlobalStyle from '../../globalStyles';

const HIGHLIGHT_DURATION = 500;

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 1,
      highlights: [false]
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.level !== nextState.level) {
      const highlights = [];
      for (let i = 0; i < nextState.level; i += 1) {
        highlights.push(false);
      }

      this.setState({highlights});
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.highlights.length !== this.state.highlights.length) {
      this.highlightTiles();
    }
  }

  componentDidMount() {
    this.highlightTiles();
  }

  highlightTiles() {
    setTimeout(() => {
      const highlights = this.state.highlights;
      highlights[0] = true;
      this.setState({highlights});
    }, HIGHLIGHT_DURATION);
  }

  renderEachTile(j) {
    const tiles = [];
    for (let i = 0; i < this.state.level; i += 1) {
      tiles.push(
        <Tile
          highlight={this.state.highlights[i]}
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
