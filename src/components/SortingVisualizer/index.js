import React from 'react';
import { withStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import getMergeSortAnimations from '../../SortingAlgotithms/mergesort';
import getBubbleSortAnimations from '../../SortingAlgotithms/bubblesort';
import getQuickSortAnimations from '../../SortingAlgotithms/quicksort';

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

  function AnimateMergesort() {
    const animations = getMergeSortAnimations(array);
    for (let i = 0; i < animations.length; i += 1) {
      const arrayBars = document.getElementsByClassName(classes.arrayElement);
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * speed);
      } else {
        setTimeout(() => {
          const [barOneIndex, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIndex].style;
          barOneStyle.height = `${newHeight / 1.4}px`;
        }, i * speed);
      }
    }
  }

  function AnimateBubbleSort() {
    const animations = getBubbleSortAnimations(array);
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
  }

  function AnimateQuickSort() {
    const animations = getQuickSortAnimations(array);
    console.log(animations);
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
          className={classes.buttonSpacing}
          variant="contained"
          color="primary"
          onClick={AnimateMergesort}
        >
          MergeSort
        </Button>
        <Button
          variant="contained"
          className={classes.buttonSpacing}
          color="primary"
          onClick={AnimateBubbleSort}
        >
          BubbleSort
        </Button>
        <Button
          className={classes.buttonSpacing}
          variant="contained"
          color="primary"
          onClick={AnimateQuickSort}
        >
          quicksort
        </Button>
      </Box>
    </>
  );
}

export default withStyles(styles, { withTheme: true })(SortingVizualizer);
