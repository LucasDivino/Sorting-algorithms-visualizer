import { addChange, addSwap, addRevert } from './helpers';

function swap(array, leftIndex, rightIndex, animations) {
  addSwap(animations, [leftIndex, array[rightIndex]]);
  addSwap(animations, [rightIndex, array[leftIndex]]);
  const temp = array[leftIndex];
  array[leftIndex] = array[rightIndex];
  array[rightIndex] = temp;
}

function partition(array, left, right, animations) {
  const pivot = array[Math.floor((right + left) / 2)];
  let i = left;
  let j = right;
  while (i <= j) {
    while (array[i] < pivot) {
      addChange(animations, [i, Math.floor((right + left) / 2)]);
      addRevert(animations, [i, Math.floor((right + left) / 2)]);
      i++;
    }
    while (array[j] > pivot) {
      addChange(animations, [j, Math.floor((right + left) / 2)]);
      addRevert(animations, [j, Math.floor((right + left) / 2)]);
      j--;
    }
    if (i <= j) {
      swap(array, i, j, animations);
      i++;
      j--;
    }
  }
  return i;
}

function quickSort(array, left, right, animations) {
  let index;
  if (array.length > 1) {
    index = partition(array, left, right, animations);
    if (left < index - 1) {
      quickSort(array, left, index - 1, animations);
    }
    if (index < right) {
      quickSort(array, index, right, animations);
    }
  }
  return animations;
}

export default function quickSortAnimations(array) {
  const animations = [];
  quickSort(array, 0, array.length - 1, animations);
  return animations;
}
