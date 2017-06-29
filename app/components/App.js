import React, {Component} from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';

import GlobalStyles from '../utils/styles/globalStyles';
import Game from '../containers/Game/game';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      begin: false
    };

    this.pressed = false;
  }

  render() {
    return (
      <View style={GlobalStyles.wrapper}>
        {!this.state.begin
        ? <Button
          onPress={() => {
            if (!this.pressed) {
              this.pressed = true;
              this.setState({
                begin: true
              });
            }
          }}
          title={'Begin !'}
        />
        : <Game />}
      </View>
    );
  }
}

export default App;
