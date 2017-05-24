import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Tile from './Tile';
import GlobalStyle from '../../globalStyles';

class Game extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Tile />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 10
  }
});

export default Game;
