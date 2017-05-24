import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getProps();
  }

  render() {
    return (
      <View style={styles.container}>
        {(this.props.defaultProps !== undefined)
          ? (<Text style={styles.message}>{this.props.defaultProps}</Text>)
          : (<Text style={styles.message}>{'Props are loading...'}</Text>)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  message: {
    fontSize: 30,
    padding: 10
  }
});

export default App;
