import React, {Component} from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';

import GlobalStyles from '../globalStyles';
import Game from './Game/index';

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
      <View style={[GlobalStyles.wrapper, {backgroundColor: 'orange'}]}>
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
