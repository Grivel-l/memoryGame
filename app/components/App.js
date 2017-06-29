import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import GlobalStyles from '../utils/styles/globalStyles';
import Game from '../containers/Game/game';
import Colors from '../utils/styles/Colors';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      begin: false
    };

    this.beginGame = this.beginGame.bind(this);
  }

  beginGame() {
    this.setState({begin: true});
  }

  renderContent() {
    if (this.state.begin) {
      return <Game />;
    } else {
      return (
        <TouchableHighlight
          onPress={this.beginGame}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{'Start game'}</Text>
        </TouchableHighlight>
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
    borderRadius: 5
  },
  buttonText: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default App;
