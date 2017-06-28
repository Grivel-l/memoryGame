import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Tile from './Tile';
import GlobalStyle from '../../globalStyles';

const HIGHLIGHT_DURATION = 1600;
class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 1,
      tilesNbr: 2,
      highlights: {},
      tiles: []
    };

    this.tilesHighlighted = 0;

    // this.highlightTiles = this.highlightTiles.bind(this);
    this.renderTiles = this.renderTiles.bind(this);
  }

  componentWillMount() {
    this.launchTurn();
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.state.level !== previousState.level) {
      this.launchTurn();
    }
  }

  launchTurn() {
    const highlights = {};
    const getHighlights = () => {
      highlights[`${this.getRandomNbr(0, this.state.tilesNbr - 1)}${this.getRandomNbr(0, this.state.tilesNbr - 1)}`] = false;
      if (Object.keys(highlights).length < this.state.level) {
        getHighlights();
      }
    };
    getHighlights();

    this.setState({highlights}, () => {
      this.highlightTiles();
    });
  }

  getRandomNbr(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  highlightTiles() {
    setTimeout(() => {
      const highlights = this.state.highlights;
      highlights[Object.keys(highlights)[this.tilesHighlighted]] = true;
      this.setState({highlights}, () => {
        if (this.tilesHighlighted < Object.keys(this.state.highlights).length) {
          this.tilesHighlighted += 1;
          this.highlightTiles();
        }
      });
    }, HIGHLIGHT_DURATION);
  }

  renderEachTile(j) {
    const tiles = [];
    for (let i = 0; i < this.state.tilesNbr; i += 1) {
      tiles.push(
        <Tile
          highlight={this.state.highlights[`${i}${j}`]}
          key={`Tile${i}${j}`}
        />
      );
    }

    return tiles;
  }

  renderTiles() {
    const tiles = [];
    for (let i = 0; i < this.state.tilesNbr; i += 1) {
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
        {Object.keys(this.state.highlights).length > 0 && this.renderTiles()}
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
