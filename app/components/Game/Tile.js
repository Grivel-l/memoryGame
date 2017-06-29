import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Animated
} from 'react-native';

import Colors from '../../utils/styles/Colors';

const HIGHLIGHT_DURATION = 400;
class Tile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      style: {}
    };

    this.pressed = false;
    this.animation = new Animated.Value(0);
    this.animationStyle = null;

    this.tilePressed = this.tilePressed.bind(this);
  }

  componentWillMount() {
    if (this.props.highlight === false) {
      this.animationStyle = {
        transform: [{
          rotateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg']
          })
        }]
      };
    } else {
      this.animationStyle = {
        transform: [{
          rotate: this.animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['0deg', '25deg', '0deg']
          })
        }]
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.highlight && nextProps.highlight) {
      this.setState({style: {backgroundColor: Colors['highlightColor']}}, () => {
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
      this.setState({style: {backgroundColor: Colors['highlightColor']}});
    } else {
      this.setState({style: {backgroundColor: Colors['wrongResponse']}});
    }

    Animated.spring(
      this.animation, {
        toValue: 1,
        useNativeDriver: true
      }
    ).start();

    this.props.tilePressed(this.props.id);
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.tilePressed}
        style={{flex: 1}}
        underlayColor={'transparent'}
      >
        <Animated.View
          style={[
            styles.wrapper,
            this.state.style,
            this.animationStyle
          ]}
        />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors['tilesColor'],
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 5,
    margin: 5
  }
});

export default Tile;
