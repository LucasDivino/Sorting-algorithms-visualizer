import { addChange, addSwap, addRevert } from './helpers';

export default function bubbleSortAnimations(array) {
  const animations = [];
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < array.length - 1; i++) {
      // change color
      addChange(animations, [i, i + 1]);
      if (array[i] > array[i + 1]) {
        // swap
        addSwap(animations, [i, array[i + 1]]);
        addSwap(animations, [i + 1, array[i]]);
        const tmp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = tmp;
        swapped = true;
      }
      // revert color
      addRevert(animations, [i, i + 1]);
    }
  } while (swapped);
  return animations;
}
