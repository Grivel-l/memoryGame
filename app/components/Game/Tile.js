import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

const HIGHLIGHT_DURATION = 400;
class Tile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      style: {}
    };

    this.pressed = false;

    this.tilePressed = this.tilePressed.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.highlight && nextProps.highlight) {
      this.setState({style: {backgroundColor: 'purple'}}, () => {
        setTimeout(() => {
          this.setState({style: {}})
        }, HIGHLIGHT_DURATION);
      })
    }
  }

  tilePressed() {
    if (!this.props.launched || this.pressed) {
      return null;
    }

    this.pressed = true;
    if (this.props.highlight) {
      this.setState({style: {backgroundColor: 'green'}});
    } else {
      this.setState({style: {backgroundColor: 'red'}});
    }

    this.props.tilePressed(this.props.id);
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.tilePressed}
        style={{flex: 1}}
        underlayColor={'transparent'}
      >
        <View style={[styles.wrapper, this.state.style]} />
      </TouchableHighlight>
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
