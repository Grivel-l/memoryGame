import React, {Component} from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

class Tile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.wrapper} />
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'gray',
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 5,
    margin: 5
  }
});

export default Tile;
