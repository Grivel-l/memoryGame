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
        <Text style={styles.title}>{'GameOver'}</Text>
        <View style={styles.bodyContent}>
          <Text style={styles.score}>{`Your score: ${this.props.score}`}</Text>
        </View>
        <TouchableHighlight
          style={[GlobalStyles.button, styles.button]}
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
    elevation: 10
  },
  title: {
    fontSize: 30,
    marginTop: 15
  },
  bodyContent: {
    flex: 1,
    justifyContent: 'center'
  },
  score: {
    fontSize: 30,
    marginBottom: 15,
    fontWeight: 'bold'
  },
  button: {
    marginBottom: 15
  }
});

export default GameOver;
