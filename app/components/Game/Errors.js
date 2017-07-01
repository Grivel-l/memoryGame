import React, {Component} from 'react';
import {
  Animated,
  Text,
  StyleSheet
} from 'react-native';

class Errors extends Component {
  constructor(props) {
    super(props);

    this.opacity = new Animated.Value(0);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.errorsNbr !== nextProps.errorsNbr && nextProps.errorsNbr !== 0 && nextProps.errorsNbr < 5) {
      this.opacity = new Animated.Value(1);
      Animated.timing(
        this.opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        }
      ).start();
    }
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          {opacity: this.opacity}
        ]}
        pointerEvents={'none'}
      >
        <Text style={styles.text}>{`${this.props.errorsNbr} error${this.props.errorsNbr > 1 ? 's' : ''}`}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    top: 0,
    margin: 10
  },
  text: {
    fontSize: 80,
    fontWeight: 'bold'
  }
});

export default Errors;
