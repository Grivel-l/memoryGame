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
      style: {},
      animating: false
    };

    this.pressed = false;
    this.animation = new Animated.Value(0);
    this.animationStyle = null;
    this.highlighted = false;
    this.animatedAnimation = null;

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
      console.log('Turn on tile');
      this.highlighted = true;
      if (this.props.animationType === 'TURN' || this.props.animationType === 'LIGHT') {
        this.setState({style: {backgroundColor: Colors['highlightColor']}}, () => {
          setTimeout(() => {
            this.setState({style: {}})
          }, HIGHLIGHT_DURATION);
        })
      } else if (this.props.animationType === 'GROW') {
        this.animationStyle = {
          transform: [{
            scale: this.animation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0]
            })
          }]
        };

        this.animatedAnimation = Animated.timing(this.animation, {
          toValue: 1,
          duration: GROW_DURATION,
          useNativeDriver: true
        });

        this.animatedAnimation.start(({finished}) => {
          this.reset(finished ? finished : null);
        });
        this.setState({animating: true});
      }
    }
  }

  reset(animationFinished) {
    if (animationFinished !== null) {
      if (!animationFinished) {
        this.setState({
          style: {},
          animating: false
        });
        this.pressed = false;
        this.animation = new Animated.Value(0);
        this.highlighted = false;
        this.animatedAnimation = null;

        this.props.tilePressed(this.props.id);
      } else {
        console.log('Game oveer');
        console.log('Game oveer');
        console.log('Game oveer');
      } 
    }
  }

  tilePressed() {
    if ((this.props.launched !== undefined && !this.props.launched) || this.pressed) {
      return null;
    }

    if (this.props.animationType !== 'LIGHT') {
      this.pressed = true;
    }

    if (this.props.animationType === 'TURN') {
      this.setState({style: {backgroundColor: Colors[this.props.highlight ? 'highlightColor' : 'wrongResponse']}});

      Animated.spring(this.animation, {
          toValue: 1,
          useNativeDriver: true
        }
      ).start();
      this.props.tilePressed(this.props.id);
    } else if (this.props.animationType === 'GROW') {
      if (this.props.highlight) {
        this.animatedAnimation.stop();
        Animated.spring(this.animation, {
          toValue: 1,
          useNativeDriver: true
        }).start(() => this.reset(false));
      }
    } else if (this.props.animationType === 'LIGHT') {
      this.props.tilePressed(this.props.id);
    }
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.tilePressed}
        style={{flex: 1, margin: 5, borderRadius: 5}}
        underlayColor={this.props.animationType === 'LIGHT' ? Colors['highlightColor'] : 'transparent'}
      >
        <Animated.View
          style={[
            styles.wrapper,
            this.state.style,
            this.props.animationType === 'TURN' && this.animationStyle
          ]}
        >
          {this.props.animationType === 'GROW' && this.highlighted &&
            <Animated.View
              style={[
                styles.growAnimation,
                this.animationStyle, {
                  opacity: this.state.animating ? 1 : 0
                }
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
  },
  growAnimation: {
    backgroundColor: Colors['highlightColor'],
    width: '100%',
    height: '100%',
    borderRadius: 10
  }
});

export default Tile;
