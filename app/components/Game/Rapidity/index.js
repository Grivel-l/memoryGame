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

    this.timeoutDuration = 1000;

    this.launchGame = this.launchGame.bind(this);
  }

  componentWillMount() {
    this.launchGame();
  }

  launchGame() {
    setTimeout(() => {
      this.setState({
        highlights: getHighlights(1, this.props.gridSize, true)
      }, () => {
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
