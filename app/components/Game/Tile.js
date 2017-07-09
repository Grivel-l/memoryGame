import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Animated
} from 'react-native';

import Colors from '../../utils/styles/Colors';

const HIGHLIGHT_DURATION = 400;
const GROW_DURATION = 2000;
class Tile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      style: {}
    };

    this.pressed = false;
    this.animation = new Animated.Value(0);
    this.animationStyle = null;
    this.highlighted = false;

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
        }, {
          perspective: 100
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
      this.highlighted = true;
      if (this.props.animationType === 'TURN') {
        this.setState({style: {backgroundColor: Colors['highlightColor']}}, () => {
          setTimeout(() => {
            this.setState({style: {}})
          }, HIGHLIGHT_DURATION);
        })
      } else {
        this.animationStyle = {
          transform: [{
            scale: this.animation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0]
            })
          }]
        };

        Animated.timing(this.animation, {
          toValue: 1,
          duration: GROW_DURATION,
          useNativeDriver: true
        }).start();
      }
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

    Animated.spring(this.animation, {
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
            this.props.animationType === 'TURN' && [this.state.style, this.animationStyle]
          ]}
        >
          {this.props.animationType === 'GROW' && this.highlighted &&
            <Animated.View
              style={[
                styles.growAnimation,
                this.animationStyle
              ]}
            />
          }
        </Animated.View>
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
  },
  growAnimation: {
    backgroundColor: Colors['highlightColor'],
    width: '100%',
    height: '100%',
    borderRadius: 10
  }
});

export default Tile;
