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
  }

  componentWillMount() {
    this.setState({
      highlights: getHighlights(2, this.props.gridSize)
    });
  }

  render() {
    return (
      <View style={GlobalStyles.gameWrapper}>
        <RenderTiles
          tilesNbr={this.props.gridSize}
          highlights={this.state.highlights}
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
