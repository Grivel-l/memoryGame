import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions
} from 'react-native';
import _ from 'lodash';

import Tile from '../../../containers/Game/tile';
import GlobalStyle from '../../../utils/styles/globalStyles';
import Errors from '../Errors';
import RenderTiles from '../RenderTiles';
import getHighlights from '../../../utils/getHighlights';

const {height} = Dimensions.get('window');
const HIGHLIGHT_DURATION = 800;
const NEXT_LEVEL_DURATION = 800;
const TRANSITION_DURATION = 800;
class Memory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 1,
      tilesNbr: 2,
      highlights: {},
      tiles: [],
      launched: false,
      text: null,
      errors: []
    };

    this.animatedText = new Animated.Value(0);
    this.tilesHighlighted = 0;
    this.errorsNbr = 0;
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
      this.handleErrors(_.difference(nextProps.pressedTiles, Object.keys(this.state.highlights)));
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

  checkGameOver() {
    if (this.errorsNbr === 5) {
      console.log('Game over');
    } else {
      console.log('Pop an error');
    }
  }

  handleErrors(tiles) {
    const errors = [...this.state.errors];
    tiles.map(tile => {
      if (errors.indexOf(parseInt(tile)) === -1) {
        errors.push(parseInt(tile));
        this.errorsNbr += 1;
        this.checkGameOver();
      }
      return null;
    });

    this.setState({errors});
  }

  nextLevel() {
    this.animatedText = new Animated.Value(0);
    this.tilesHighlighted = 0;
    this.shuffledKeys = null;
    this.setState({
      level: this.state.level + 1,
      tilesNbr: (this.state.level + 1) % 2 === 0 ? this.state.tilesNbr + 1 : this.state.tilesNbr,
      highlights: {},
      errors: []
    });
  }

  launchTurn() {
    const highlights = getHighlights(this.state.level, this.state.tilesNbr);
    this.setState({text: `Level ${this.state.level}`, highlights}, () => {
      this.shuffledKeys = _.shuffle(Object.keys(highlights));
      Animated.spring(
        this.animatedText, {
          toValue: 1,
          useNativeDriver: true
        }
      ).start(() => {
        setTimeout(() => {
          Animated.spring(
            this.animatedText, {
              toValue: 2,
              useNativeDriver: true
            }
          ).start(() => {
            this.setState({text: null}, () => {
              this.highlightTiles();
            });
          });
        }, TRANSITION_DURATION);
      });
    });
  }

  highlightTiles() {
    const highlights = this.state.highlights;
    highlights[this.shuffledKeys[this.tilesHighlighted]] = true;
    this.setState({highlights}, () => {
      this.tilesHighlighted += 1;
      if (this.tilesHighlighted < Object.keys(this.state.highlights).length) {
        setTimeout(() => {
          this.highlightTiles();
        }, HIGHLIGHT_DURATION);
      } else {
        this.setState({launched: true});
      }
    });
  }

  renderText() {
    return (
      <Animated.View
        style={[
          styles.transitionTextWrapper,
          {transform: [{
            translateY: this.animatedText.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [-50, height / 3, height]
            })
          }]}
        ]}
      >
        <Text style={styles.transitionText}>{this.state.text}</Text>
      </Animated.View>
    );
  }

  renderTiles() {
    if (Object.keys(this.state.highlights).length > 0) {
      return (
        <RenderTiles
          tilesNbr={this.state.tilesNbr}
          highlights={this.state.highlights}
          launched={this.state.launched}
          animationType={'TURN'}
        />
      )
    } else {
      return <View />;
    }
  }

  render() {
    return (
      <View style={GlobalStyle.gameWrapper}>
        {this.renderTiles()}
        {this.renderText()}
        <Errors
          errorsNbr={this.errorsNbr}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  transitionTextWrapper: {
    position: 'absolute',
    top: 0,
    flex: 1,
    margin: 10,
    width: '100%',
    alignItems: 'center'
  },
  transitionText: {
    fontSize: 50,
    fontWeight: 'bold'
  }
});

export default Memory;
