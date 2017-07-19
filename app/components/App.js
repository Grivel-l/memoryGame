import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import GlobalStyles from '../utils/styles/globalStyles';
import Memory from '../containers/Game/Memory/index';
import Rapidity from '../containers/Game/Rapidity/index';
import Simon from '../containers/Game/Simon/index';
import Colors from '../utils/styles/Colors';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      begin: false,
      gridSize: 3
    };

    this.beginGame = this.beginGame.bind(this);
    this.changeGridSize = this.changeGridSize.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.redirection === null && nextProps.redirection !== null) {
      this.setState({begin: false});
      this.props.resetRedirect();
    }
  }

  beginGame(gameMode) {
    this.setState({begin: gameMode});
  }

  renderGame() {
    if (this.state.begin === 'MEMORY') {
      return <Memory />;
    } else if (this.state.begin === 'RAPIDITY') {
      return <Rapidity gridSize={this.state.gridSize} />;
    } else if (this.state.begin === 'SIMON') {
      return <Simon gridSize={this.state.gridSize} />;
    }

    return <View />
  }

  changeGridSize() {
    this.setState({
      gridSize: this.state.gridSize === 6 ? 3 : this.state.gridSize + 1
    });
  }

  renderContent() {
    if (this.state.begin !== false) {
      return this.renderGame();
    } else {
      return (
        <View>
          <View style={styles.buttonWrapper}>
            <TouchableHighlight
              onPress={() => this.beginGame('MEMORY')}
              style={GlobalStyles.button}
            >
              <Text style={GlobalStyles.buttonText}>{'Memory game'}</Text>
            </TouchableHighlight>
          </View>
          <View style={[styles.buttonWrapper, styles.disabled]}>
            <TouchableHighlight
              // onPress={() => this.beginGame('RAPIDITY')}
              style={GlobalStyles.button}
            >
              <Text style={GlobalStyles.buttonText}>{'Rapidity game'}</Text>
            </TouchableHighlight>
            <TouchableHighlight
              // onPress={this.changeGridSize}
              style={styles.subTextWrapper}
              underlayColor={Colors['tilesColor']}
            >
              <Text style={styles.subText}>{`Grid size: ${this.state.gridSize}x${this.state.gridSize}`}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableHighlight
              onPress={() => this.beginGame('SIMON')}
              style={GlobalStyles.button}
            >
              <Text style={GlobalStyles.buttonText}>{'Simon game'}</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.changeGridSize}
              style={styles.subTextWrapper}
              underlayColor={Colors['tilesColor']}
            >
              <Text style={styles.subText}>{`Grid size: ${this.state.gridSize}x${this.state.gridSize}`}</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={GlobalStyles.wrapper}>
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonWrapper: {
    margin: 10,
    alignItems: 'center'
  },
  subTextWrapper: {
    maxWidth: '50%',
    backgroundColor: Colors['tilesColor'],
    padding: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  subText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  disabled: {
    opacity: 0.3
  }
});

export default App;
