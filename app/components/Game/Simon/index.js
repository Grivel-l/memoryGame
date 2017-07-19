import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions
} from 'react-native';
// import _ from 'lodash';

import GlobalStyle from '../../../utils/styles/globalStyles';
import getHighlights from '../../../utils/getHighlights';
import RenderTiles from '../RenderTiles';
import Margins from '../../../utils/styles/Margins';
import Colors from '../../../utils/styles/Colors';

const {height} = Dimensions.get('window');
class Simon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      highlights: [],
      launched: false
    };

    this.level = 1;
    this.pressedTiles = [];
    this.highlightsTiles = [];
    this.gameOverAnimation = new Animated.Value(0);

    this.beginGame = this.beginGame.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.beginGame();
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pressedTiles.length !== nextProps.pressedTiles.length) {
      if (nextProps.pressedTiles.length === 0) {
        setTimeout(this.beginGame, 500);
      } else {
        this.checkTiles(nextProps.pressedTiles);
      }
    }
  }

  checkTiles(tiles) {
    let error = false;
    tiles.map((tile, index) => {
      if (tile !== this.highlightsTiles[index]) {
        error = true;
      }
    });

    if (error) {
      this.gameOver();
    } else {
      if (this.highlightsTiles.length === tiles.length) {
        this.nextLevel();
      }
    }
  }

  gameOver() {
    Animated.spring(this.gameOverAnimation, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 15,
      speed: 7
    }).start();
    this.setState({launched: false});
  }

  nextLevel() {
    this.level += 1;
    this.setState({launched: false}, this.props.resetPressed);
  }

  beginGame() {
    let i = 0;
    const highlight = getHighlights(1, this.props.gridSize);
    this.setState({
      highlights: {...this.state.highlights, ...highlight}
    }, () => {
      this.highlightsTiles.push(Object.keys(highlight)[0]);
      const turnOnTile = () => {
        const highlights = {...this.state.highlights};
        Object.keys(highlights).map(key => {
          highlights[key] = false;
        });
        this.setState({highlights}, () => {
          highlights[this.highlightsTiles[i]] = true;
          this.setState({highlights});
          if (this.highlightsTiles[i + 1] !== undefined) {
            setTimeout(() => {
              i += 1;
              turnOnTile();
            }, 300);
          } else {
            this.setState({launched: true});
          }
        });
      };

      turnOnTile();
    });
  }

  renderTiles() {
    return (
      <RenderTiles
        tilesNbr={this.props.gridSize}
        highlights={this.state.highlights}
        launched={this.state.launched}
        animationType={'LIGHT'}
      />
    );
  }

  renderText() {
    return <View />;
  }

  render() {
    return (
      <View style={GlobalStyle.gameWrapper}>
        {this.renderTiles()}
        {this.renderText()}
        <Animated.View
          style={[
            styles.gameOverModalWrapper,
            {transform: [{
              translateY: this.gameOverAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, height]
              })
            }]}
          ]}
        >
          <View style={styles.gameOverModal}>
            <Text>{'GameOver'}</Text>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gameOverModal: {
    width: '70%',
    height: '70%',
    backgroundColor: Colors['backgroundColor'],
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameOverModalWrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: -height,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    margin: Margins['gameWrapper']
  }
});

export default Simon;
