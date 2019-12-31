function doMerge(array, startIndex, middleIndex, endIndex, auxiliaryArray, animations) {
  let k = startIndex;
  let i = startIndex;
  let j = middleIndex + 1;
  let animation;
  while (i <= middleIndex && j <= endIndex) {
    // change color
    animation = {
      operation: 'change-color',
      positions: [i, j]
    };
    animations.push(animation);
    // revert color
    animation = {
      operation: 'revert-color',
      positions: [i, j]
    };
    animations.push(animation);

    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // rewrite value
      animation = {
        operation: 'swap',
        positions: [k, auxiliaryArray[i]]
      };
      animations.push(animation);
      array[k++] = auxiliaryArray[i++];
    } else {
      // rewrite value
      animation = {
        operation: 'swap',
        positions: [k, auxiliaryArray[j]]
      };
      animations.push(animation);
      array[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIndex) {
    // change color
    animation = {
      operation: 'change-color',
      positions: [i, i]
    };
    animations.push(animation);
    // revert color
    animation = {
      operation: 'revert-color',
      positions: [i, i]
    };
    animations.push(animation);
    // rewrite value
    animation = {
      operation: 'swap',
      positions: [k, auxiliaryArray[i]]
    };
    animations.push(animation);
    array[k++] = auxiliaryArray[i++];
  }
  while (j <= endIndex) {
    // change color
    animation = {
      operation: 'change-color',
      positions: [j, j]
    };
    animations.push(animation);
    // revert color
    animation = {
      operation: 'revert-color',
      positions: [j, j]
    };
    animations.push(animation);
    // rewrite value;
    animation = {
      operation: 'swap',
      positions: [k, auxiliaryArray[j]]
    };
    animations.push(animation);
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
