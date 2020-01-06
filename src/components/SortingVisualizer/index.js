import React from 'react';
import { withStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as actions } from '../../Store/Ducks/animationRunning';
// sorting algorithms
import getMergeSortAnimations from '../../SortingAlgotithms/mergesort';
import getBubbleSortAnimations from '../../SortingAlgotithms/bubblesort';
import getQuickSortAnimations from '../../SortingAlgotithms/quicksort';
import getHeapSortAnimations from '../../SortingAlgotithms/heapsort';
import getShellSortAnimations from '../../SortingAlgotithms/shellsort';

const PRIMARY_COLOR = '#408050';

const SECONDARY_COLOR = 'red';

const styles = () => ({
  arrayConatainer: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10
  },
  arrayElement: {
    display: 'inline-flex',
    direction: 'colunm',
    marginRight: 2,
    backgroundColor: PRIMARY_COLOR,
    width: 100
  }
});

function SortingVisualizer(props) {
  const { classes } = props;
  const { speed } = props;
  const { array } = props;

  function delay(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  async function animate(animations) {
    props.setIsRunning(true);
    const promises = animations.map(async (element, index) => {
      const arrayBars = document.getElementsByClassName(classes.arrayElement);
      return delay(index * speed).then(() => {
        const [barOneIndex, barTwoIndex] = element.positions;
        switch (element.operation) {
          case 'change-color':
            arrayBars[barOneIndex].style.backgroundColor = SECONDARY_COLOR;
            arrayBars[barTwoIndex].style.backgroundColor = SECONDARY_COLOR;
            break;
          case 'revert-color':
            arrayBars[barOneIndex].style.backgroundColor = PRIMARY_COLOR;
            arrayBars[barTwoIndex].style.backgroundColor = PRIMARY_COLOR;
            break;
          case 'swap':
            arrayBars[barOneIndex].style.height = `${barTwoIndex / 1.4}px`;
            break;
          default:
        }
      });
    });
    await Promise.all(promises);
    props.setIsRunning(false);
  }

  function AnimateMergesort() {
    const arrayCopy = [...array];
    const animations = getMergeSortAnimations(arrayCopy);
    animate(animations);
  }

  function AnimateBubbleSort() {
    const arrayCopy = [...array];
    const animations = getBubbleSortAnimations(arrayCopy);
    animate(animations);
  }

  function AnimateQuickSort() {
    const arrayCopy = [...array];
    const animations = getQuickSortAnimations(arrayCopy);
    animate(animations);
  }

  function AnimateHeapSort() {
    const arrayCopy = [...array];
    const animations = getHeapSortAnimations(arrayCopy);
    animate(animations);
  }

  function animateShellSort() {
    const arrayCopy = [...array];
    const animations = getShellSortAnimations(arrayCopy);
    animate(animations);
  }

  return (
    <>
      <Box className={classes.arrayConatainer}>
        {array.map((value, index) => (
          <div
            className={classes.arrayElement}
            style={{ height: `${value / 1.4}px` }}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          />
        ))}
      </Box>
      <Grid container direction="row" justify="center" spacing={4}>
        <Grid item>
          <Button
            disabled={props.isRunning}
            variant="contained"
            color="primary"
            onClick={AnimateMergesort}
          >
            MergeSort
          </Button>
        </Grid>
        <Grid item>
          <Button
            disabled={props.isRunning}
            variant="contained"
            color="primary"
            onClick={AnimateBubbleSort}
          >
            BubbleSort
          </Button>
        </Grid>
        <Grid item>
          <Button
            disabled={props.isRunning}
            variant="contained"
            color="primary"
            onClick={AnimateQuickSort}
          >
            quicksort
          </Button>
        </Grid>
        <Grid item>
          <Button
            disabled={props.isRunning}
            variant="contained"
            color="primary"
            onClick={AnimateHeapSort}
          >
            heapsort
          </Button>
        </Grid>
        <Grid item>
          <Button
            disabled={props.isRunning}
            variant="contained"
            color="primary"
            onClick={animateShellSort}
          >
            shellsort
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

const mapStateTopProps = state => ({
  isRunning: state.animationRunning
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withStyles(styles, { withTheme: true })(
  connect(mapStateTopProps, mapDispatchToProps)(SortingVisualizer)
);
