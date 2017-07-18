import React, {Component} from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import Tile from '../Tile';
import GlobalStyles from '../../../utils/styles/globalStyles';
import RenderTiles from '../RenderTiles';
import getHighlights from '../../../utils/getHighlights';

class Rapidity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      highlights: {}
    };

    this.timeoutDuration = 800;
    this.isBusy = {};

    this.launchGame = this.launchGame.bind(this);
  }

  componentWillMount() {
    this.launchGame();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pressedTiles.length !== nextProps.pressedTiles.length) {
      this.isBusy[nextProps.pressedTiles[nextProps.pressedTiles.length - 1]] = false;
    }
  }

  launchGame() {
    setTimeout(() => {
      let highlights;
      const getHL = () => {
        highlights = getHighlights(1, this.props.gridSize, true);
        if (this.isBusy[Object.keys(highlights)[0]]) {
          getHL();
        }
      };
      getHL();

      this.setState({
        highlights
      }, () => {
        this.isBusy[Object.keys(this.state.highlights)[0]] = true;
        if (this.timeoutDuration > 200) {
          this.timeoutDuration -= 20;
        }
        this.launchGame();
      })
    }, this.timeoutDuration);
  }

  render() {
    return (
      <View style={GlobalStyles.gameWrapper}>
        <RenderTiles
          tilesNbr={this.props.gridSize}
          highlights={this.state.highlights}
          animationType={'GROW'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',

  }
});

export default Rapidity;
