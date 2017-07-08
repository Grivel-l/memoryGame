import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import GlobalStyles from '../utils/styles/globalStyles';
import Memory from '../containers/Game/Memory/index';
import Colors from '../utils/styles/Colors';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      begin: false
    };

    this.beginGame = this.beginGame.bind(this);
  }

  beginGame(gameMode) {
    this.setState({begin: gameMode});
  }

  renderGame() {
    return this.state.begin === 'MEMORY' ? <Memory /> : <Memory />;
  }

  renderContent() {
    if (this.state.begin !== false) {
      return this.renderGame();
    } else {
      return (
        <View>
          <TouchableHighlight
            onPress={() => this.beginGame('MEMORY')}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{'Memory game'}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.beginGame('RAPIDITY')}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{'Rapidity game'}</Text>
          </TouchableHighlight>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={GlobalStyles.wrapper}>
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors['tilesColor'],
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    margin: 10
  },
  buttonText: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default App;
