import React from 'react';
import { withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
// redux
import { connect } from 'react-redux';
// assets
import SortingVisualizer from '../SortingVisualizer';

const styles = theme => ({
  appBarColor: {
    backgroundColor: '#408050'
  },
  title: {
    position: 'absolute',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  sliderBox: {
    width: 100,
    marginLeft: 40,
    marginTop: 15
  },
  sliderText: {
    position: 'absolute',
    paddingBottom: 10
  },
  slider: {
    marginTop: 20
  },
  buttonReset: {
    marginLeft: 40
  }
});

function setMax() {
  const screenSize = window.innerWidth;
  switch (true) {
    case screenSize > 1000:
      return 250;
    case screenSize < 1000 && screenSize > 700:
      return 150;
    case screenSize < 700 && screenSize > 400:
      return 100;
    case screenSize < 400:
      return 50;
    default:
      return 250;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: 1,
      arraySize: setMax(),
      array: [],
      arrayMax: setMax()
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  setArray = newArray => {
    this.setState({ array: newArray });
  };

  handleSliderChange(value, prop) {
    if (prop === 'speed') {
      value = 30 - value;
    }
    this.setState({ [prop]: value });
  }

  resetArray() {
    const newArray = [];
    for (let i = 0; i < this.state.arraySize; i += 1) {
      newArray.push(this.randomInt(10, 1000));
    }
    this.setState({ array: newArray });
  }

  // eslint-disable-next-line class-methods-use-this
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <AppBar position="static" className={classes.appBarColor}>
          <Toolbar>
            <Typography align="center" color="secondary" variant="h5" className={classes.title}>
              Sorting Visualizer
            </Typography>
            <Box className={classes.sliderBox}>
              <Typography className={classes.sliderText}>Array Size</Typography>
              <Slider
                min={4}
                className={classes.slider}
                onChange={(e, value) => this.handleSliderChange(value, 'arraySize')}
                max={this.state.arrayMax}
                color="secondary"
                defaultValue={this.state.arrayMax}
              />
            </Box>
            <Box className={classes.sliderBox}>
              <Typography className={classes.sliderText}>Animation Speed</Typography>
              <Slider
                onChange={(e, value) => this.handleSliderChange(value, 'speed')}
                className={classes.slider}
                max={30}
                color="secondary"
                defaultValue={30}
              />
            </Box>
            <Button
              className={classes.buttonReset}
              onClick={() => this.resetArray()}
              variant="contained"
              color="secondary"
              disabled={this.props.isRunning}
            >
              reset
            </Button>
          </Toolbar>
        </AppBar>
        <SortingVisualizer
          array={this.state.array}
          speed={this.state.speed}
          setArray={this.setArray}
        />
      </>
    );
  }
}

const mapStateTopProps = state => ({
  isRunning: state.animationRunning
});

export default withStyles(styles, { withTheme: true })(connect(mapStateTopProps)(App));
