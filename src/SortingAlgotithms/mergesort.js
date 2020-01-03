import { addChange, addSwap, addRevert } from './helpers';

function doMerge(array, startIndex, middleIndex, endIndex, auxiliaryArray, animations) {
  let k = startIndex;
  let i = startIndex;
  let j = middleIndex + 1;
  while (i <= middleIndex && j <= endIndex) {
    // change color
    addChange(animations, [i, j]);
    // revert color
    addRevert(animations, [i, j]);
    addSwap(animations, [k, auxiliaryArray[i]]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      addSwap(animations, [k, auxiliaryArray[i]]);
      array[k++] = auxiliaryArray[i++];
    } else {
      // rewrite value
      addSwap(animations, [k, auxiliaryArray[j]]);
      array[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIndex) {
    // change color
    addChange(animations, [i, i]);
    // revert color
    addRevert(animations, [i, i]);
    // rewrite value
    addSwap(animations, [k, auxiliaryArray[i]]);
    array[k++] = auxiliaryArray[i++];
  }
  while (j <= endIndex) {
    // change color
    addChange(animations, [j, j]);
    // revert color
    addRevert(animations, [j, j]);
    // rewrite value;
    addSwap(animations, [k, auxiliaryArray[j]]);
    array[k++] = auxiliaryArray[j++];
  }
}

function mergeSortHelper(array, startIndex, endIndex, auxiliaryArray, animations) {
  if (startIndex === endIndex) return;
  const middleIndex = Math.floor((startIndex + endIndex) / 2);
  mergeSortHelper(auxiliaryArray, startIndex, middleIndex, array, animations);
  mergeSortHelper(auxiliaryArray, middleIndex + 1, endIndex, array, animations);
  doMerge(array, startIndex, middleIndex, endIndex, auxiliaryArray, animations);
}

export default function mergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}
