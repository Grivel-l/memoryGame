import React, {Component} from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

class Tile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      style: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.highlight && nextProps.highlight) {
      this.setState({style: {backgroundColor: 'purple'}}, () => {
        setTimeout(() => {
          this.setState({style: {}})
        }, 800);
      })
    }
  }

  render() {
    return (
      <View style={[styles.wrapper, this.state.style]} />
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
