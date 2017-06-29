import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import _ from 'lodash';

import Tile from '../../containers/Game/tile';
import GlobalStyle from '../../utils/styles/globalStyles';

const HIGHLIGHT_DURATION = 800;
const NEXT_LEVEL_DURATION = 800;
class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 1,
      tilesNbr: 2,
      highlights: {},
      tiles: [],
      launched: false
    };

    this.tilesHighlighted = 0;

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

  componentWillReceiveProps(nextProps) {
    if (this.props.pressedTiles.length !== nextProps.pressedTiles.length) {
      if (nextProps.pressedTiles.length >= Object.keys(this.state.highlights).length) {
        let allFind = true;
        Object.keys(this.state.highlights).map(event => {
          if (!_.find(nextProps.pressedTiles, event2 => event2 === event)) {
            allFind = false;
          }
        });

        if (allFind) {
          this.setState({launched: false}, () => {
            this.props.resetPressed();
            setTimeout(() => {
              this.tilesHighlighted = 0;
              this.setState({
                level: this.state.level + 1,
                tilesNbr: (this.state.level + 1) % 2 === 0 ? this.state.tilesNbr + 1 : this.state.tilesNbr,
                highlights: {}
              });
            }, NEXT_LEVEL_DURATION);
          });
        }
      }
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
        this.tilesHighlighted += 1;
        if (this.tilesHighlighted < Object.keys(this.state.highlights).length) {
          this.highlightTiles();
        } else {
          this.setState({launched: true});
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
          launched={this.state.launched}
          id={`${i}${j}`}
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
