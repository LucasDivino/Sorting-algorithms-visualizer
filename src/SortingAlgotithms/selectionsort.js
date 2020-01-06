import { addChange, addSwap, addRevert } from './helpers';

function swap(indexA, indexB, array, animations) {
  addSwap(animations, [indexA, array[indexB]]);
  addSwap(animations, [indexB, array[indexA]]);
  const tmp = array[indexA];
  array[indexA] = array[indexB];
  array[indexB] = tmp;
}

export default function selectionSort(array) {
  const animations = [];
  for (let i = 0; i < array.length; i++) {
    let min = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[min] > array[j]) {
        addChange(animations, [min, j]);
        addRevert(animations, [min, j]);
        min = j;
      }
    }
    if (min !== i) {
      swap(i, min, array, animations);
    }
  }
  return animations;
}
