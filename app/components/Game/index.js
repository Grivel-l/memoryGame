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
const TRANSITION_DURATION = 1000;
class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 1,
      tilesNbr: 2,
      highlights: {},
      tiles: [],
      launched: false,
      text: null
    };

    this.tilesHighlighted = 0;
    this.shuffledKeys = null;

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
              this.nextLevel();
            }, NEXT_LEVEL_DURATION);
          });
        }
      }
    }
  }

  nextLevel() {
    this.tilesHighlighted = 0;
    this.shuffledKeys = null;
    this.setState({
      level: this.state.level + 1,
      tilesNbr: (this.state.level + 1) % 2 === 0 ? this.state.tilesNbr + 1 : this.state.tilesNbr,
      highlights: {}
    });
  }

  launchTurn() {
    const highlights = {};
    const getHighlights = () => {
      highlights[`${this.getRandomNbr(0, this.state.tilesNbr - 1)}${this.getRandomNbr(0, this.state.tilesNbr - 1)}`] = false;
      if (Object.keys(highlights).length < this.state.level) {
        getHighlights();
      }
    };

    this.setState({text: `Level ${this.state.level}`}, () => {
      setTimeout(() => {
        this.setState({text: null}, () => {
          getHighlights();

          this.setState({highlights}, () => {
            this.shuffledKeys = _.shuffle(Object.keys(highlights));
            this.highlightTiles();
          });
        });
      }, TRANSITION_DURATION);
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
      highlights[this.shuffledKeys[this.tilesHighlighted]] = true;
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

  renderText() {
    return (
      <View style={styles.transitionTextWrapper}>
        <Text style={styles.transitionText}>{this.state.text}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.wrapper}>
        {Object.keys(this.state.highlights).length > 0 && this.renderTiles()}
        {this.state.text !== null && this.renderText()}
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
  },
  transitionTextWrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  transitionText: {
    fontSize: 50,
    fontWeight: 'bold'
  }
});

export default Game;
