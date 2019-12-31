import React from 'react';
import { withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
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

class personalizedAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: 1,
      arraySize: 250,
      array: []
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  handleSliderChange(value, prop) {
    if (prop === 'speed') {
      value = 100 - value;
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
          <Container maxWidth="lg">
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
                  max={250}
                  color="secondary"
                  defaultValue={250}
                />
              </Box>
              <Box className={classes.sliderBox}>
                <Typography className={classes.sliderText}>Animation Speed</Typography>
                <Slider
                  onChange={(e, value) => this.handleSliderChange(value, 'speed')}
                  className={classes.slider}
                  max={100}
                  color="secondary"
                  defaultValue={100}
                />
              </Box>
              <Button
                className={classes.buttonReset}
                onClick={() => this.resetArray()}
                variant="contained"
                color="secondary"
              >
                reset
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
        <SortingVisualizer array={this.state.array} speed={this.state.speed} />
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(personalizedAppBar);
