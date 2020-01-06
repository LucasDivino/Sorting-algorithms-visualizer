import { addChange, addSwap, addRevert } from './helpers';

export default function animateInsertionSort(array) {
  const animations = [];
  for (let i = 1; i < array.length; i++) {
    let j = i - 1;
    const tmp = array[i];

    while (j >= 0 && array[j] > tmp) {
      addChange(animations, [i, j]);
      addRevert(animations, [i, j]);
      addSwap(animations, [j + 1, array[j]]);
      array[j + 1] = array[j];
      j--;
    }
    addSwap(animations, [j + 1, tmp]);
    array[j + 1] = tmp;
  }
  return animations;
}
