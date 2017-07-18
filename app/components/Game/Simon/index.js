import React, {Component} from 'react';
import {
  View,
  Text
} from 'react-native';

import GlobalStyle from '../../../utils/styles/globalStyles';
import getHighlights from '../../../utils/getHighlights';
import RenderTiles from '../RenderTiles';

class Simon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      highlights: [],
      launched: false
    };

    this.level = 1;
  }

  componentDidMount() {
    setTimeout(() => {
      this.beginGame();
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pressedTiles.length !== nextProps.pressedTiles.length) {
      console.log('Tile pressed');
    }
  }

  beginGame() {
    this.setState({
      highlights: getHighlights(1, this.props.gridSize, true)
    });
  }

  renderTiles() {
    return (
      <RenderTiles
        tilesNbr={this.props.gridSize}
        highlights={this.state.highlights}
        launched={this.state.launched}
        animationType={'TURN'}
      />
    );
  }

  renderText() {
    return <View />;
  }

  render() {
    return (
      <View style={GlobalStyle.gameWrapper}>
        {this.renderTiles()}
        {this.renderText()}
      </View>
    );
  }
}

export default Simon;
