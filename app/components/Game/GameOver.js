import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import Colors from '../../utils/styles/Colors';
import GlobalStyles from '../../utils/styles/globalStyles';

class GameOver extends Component {
  render() {
    return (
      <View style={styles.gameOverModal}>
        <Text>{'GameOver'}</Text>
        <TouchableHighlight
          style={GlobalStyles.button}
          onPress={() => {
            this.props.redirect('MAIN_MENU');
          }}
        >
          <Text style={GlobalStyles.buttonText}>{'Main menu'}</Text>
        </TouchableHighlight>
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
  }
});

export default GameOver;
