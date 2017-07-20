import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions
} from 'react-native';

import GlobalStyle from '../../../utils/styles/globalStyles';
import getHighlights from '../../../utils/getHighlights';
import RenderTiles from '../RenderTiles';
import Margins from '../../../utils/styles/Margins';
import GameOver from '../../../containers/Game/gameOver';
import {getRandomNbr} from '../../../utils/getHighlights';

const {height} = Dimensions.get('window');
class Simon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      highlights: [],
      launched: false,
      score: 0
    };

    this.level = 1;
    this.colors = [];
    this.pressedTiles = [];
    this.highlightsTiles = [];
    this.gameOverAnimation = new Animated.Value(0);

    this.beginGame = this.beginGame.bind(this);
  }

  componentWillMount() {
    for (let i = 0; i < this.props.gridSize; i += 1) {
      for (let j = 0; j < this.props.gridSize; j += 1) {
        this.colors.push(`rgba(${getRandomNbr(0, 255)}, ${getRandomNbr(0, 255)}, ${getRandomNbr(0, 255)}, 0.2)`);   
      }
    }
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

  componentWillUnmount() {
    this.props.resetPressed();
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
    this.setState({launched: false, score: this.level});
    Animated.spring(this.gameOverAnimation, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 15,
      speed: 7
    }).start();
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
            }, 800);
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
        colors={this.colors}
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
          <GameOver score={this.state.score} />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
