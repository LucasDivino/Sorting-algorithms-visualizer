function doMerge(array, startIndex, middleIndex, endIndex, auxiliaryArray, animations) {
  let k = startIndex;
  let i = startIndex;
  let j = middleIndex + 1;
  while (i <= middleIndex && j <= endIndex) {
    // change color.
    animations.push([i, j]);
    // revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // rewrite value
      animations.push([k, auxiliaryArray[i]]);
      array[k++] = auxiliaryArray[i++];
    } else {
      // rewrite value
      animations.push([k, auxiliaryArray[j]]);
      array[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIndex) {
    // change color.
    animations.push([i, i]);
    // revert their color.
    animations.push([i, i]);
    // rewrite value;
    animations.push([k, auxiliaryArray[i]]);
    array[k++] = auxiliaryArray[i++];
  }
  while (j <= endIndex) {
    // change color.
    animations.push([j, j]);
    // revert their color.
    animations.push([j, j]);
    // rewrite value;
    animations.push([k, auxiliaryArray[j]]);
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
