import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import getMergeSortAnimations from '../../SortingAlgotithms/mergesort';
import getBubbleSortAnimations from '../../SortingAlgotithms/bubblesort';
import getQuickSortAnimations from '../../SortingAlgotithms/quicksort';
import getHeapSortAnimations from '../../SortingAlgotithms/heapsort';

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
  },
  buttonsBar: {
    margin: 30,
    display: 'flex',
    justifyContent: 'center'
  },
  buttonSpacing: {
    marginRight: 40
  }
});

function SortingVizualizer(props) {
  const { classes } = props;
  const { speed } = props;
  const { array } = props;
  const [isRunning, setIsRunning] = useState(false);

  function animate(animations) {
    setIsRunning(true);
    for (let i = 0; i < animations.length; i += 1) {
      const arrayBars = document.getElementsByClassName(classes.arrayElement);
      if (animations[i].operation === 'change-color') {
        const [barOneIndex, barTwoIndex] = animations[i].positions;
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * speed);
      }
      if (animations[i].operation === 'revert-color') {
        const [barOneIndex, barTwoIndex] = animations[i].positions;
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, i * speed);
      }
      if (animations[i].operation === 'swap') {
        setTimeout(() => {
          const [barOneIndex, newHeight] = animations[i].positions;
          const barOneStyle = arrayBars[barOneIndex].style;
          barOneStyle.height = `${newHeight / 1.4}px`;
        }, i * speed);
      }
    }
    setIsRunning(false);
  }

  function AnimateMergesort() {
    const animations = getMergeSortAnimations(array);
    animate(animations);
  }

  function AnimateBubbleSort() {
    const animations = getBubbleSortAnimations(array);
    animate(animations);
  }

  function AnimateQuickSort() {
    const animations = getQuickSortAnimations(array);
    animate(animations);
  }

  function AnimateHeapSort() {
    const animations = getHeapSortAnimations(array);
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
      <Box className={classes.buttonsBar}>
        <Button
          disabled={isRunning}
          className={classes.buttonSpacing}
          variant="contained"
          color="primary"
          onClick={AnimateMergesort}
        >
          MergeSort
        </Button>
        <Button
          disabled={isRunning}
          variant="contained"
          className={classes.buttonSpacing}
          color="primary"
          onClick={AnimateBubbleSort}
        >
          BubbleSort
        </Button>
        <Button
          disabled={isRunning}
          className={classes.buttonSpacing}
          variant="contained"
          color="primary"
          onClick={AnimateQuickSort}
        >
          quicksort
        </Button>

        <Button
          disabled={isRunning}
          className={classes.buttonSpacing}
          variant="contained"
          color="primary"
          onClick={AnimateHeapSort}
        >
          heapsort
        </Button>
      </Box>
    </>
  );
}

export default withStyles(styles, { withTheme: true })(SortingVizualizer);
