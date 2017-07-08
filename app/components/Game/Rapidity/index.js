import React, {Component} from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import Tile from '../Tile';
import GlobalStyles from '../../../utils/styles/globalStyles';

class Rapidity extends Component {
  constructor(props) {
    super(props);
  }

  renderTiles() {
    return <View />
  }

  render() {
    return (
      <View style={GlobalStyles.gameWrapper}>
        {this.renderTiles()}
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
