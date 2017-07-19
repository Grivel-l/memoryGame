import React, {Component} from 'react';
import {
  View,
  Text
} from 'react-native';
import _ from 'lodash';

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
    this.pressedTiles = [];
    this.highlightsTiles = [];

    this.beginGame = this.beginGame.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.beginGame();
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pressedTiles.length !== nextProps.pressedTiles.length) {
      if (nextProps.pressedTiles.length === 0) {
        setTimeout(this.beginGame, 500);
      } else {
        this.checkTiles(nextProps.pressedTiles);
      }
    }
  }

  checkTiles(tiles) {
    let error = false;
    tiles.map(tile => {
      if (_.find(Object.keys(this.state.highlights), key => key === tile) === undefined) {
        error = true;
      }
    });

    if (error) {
      console.log('Error', error);
    } else {
      if (Object.keys(this.state.highlights).length === tiles.length) {
        this.nextLevel();
      } else {
        console.log('this.state.highlights', this.state.highlights);
        console.log('Tiles', tiles);
      }
    }
  }

  nextLevel() {
    this.level += 1;
    this.setState({launched: false}, this.props.resetPressed);
  }

  beginGame() {
    let i = 0;
    const highlight = getHighlights(1, this.props.gridSize);
    this.setState({
      highlights: {...this.state.highlights, ...highlight}
    }, () => {
      this.highlightsTiles.push(Object.keys(highlight)[0]);
      const turnOnTile = () => {
        const highlights = {...this.state.highlights};
        Object.keys(highlights).map(key => {
          highlights[key] = false;
        });
        this.setState({highlights}, () => {
          highlights[this.highlightsTiles[i]] = true;
          this.setState({highlights});
          if (this.highlightsTiles[i + 1] !== undefined) {
            setTimeout(() => {
              i += 1;
              turnOnTile();
            }, 300);
          } else {
            this.setState({launched: true});
          }
        });
      };

      turnOnTile();
    });
  }

  renderTiles() {
    return (
      <RenderTiles
        tilesNbr={this.props.gridSize}
        highlights={this.state.highlights}
        launched={this.state.launched}
        animationType={'LIGHT'}
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
