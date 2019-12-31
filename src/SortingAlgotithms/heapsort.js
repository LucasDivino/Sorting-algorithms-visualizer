let arrayLength;

function swap(array, leftIndex, rightIndex, animations) {
  let animation = {
    operation: 'swap',
    positions: [leftIndex, array[rightIndex]]
  };
  animations.push(animation);
  animation = {
    operation: 'swap',
    positions: [rightIndex, array[leftIndex]]
  };
  animations.push(animation);
  const temp = array[leftIndex];
  array[leftIndex] = array[rightIndex];
  array[rightIndex] = temp;
}

function heapRoot(array, i, animations) {
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  let animation;
  let max = i;

  if (left < arrayLength && array[left] > array[max]) {
    max = left;
  }

  if (right < arrayLength && array[right] > array[max]) {
    max = right;
  }

  if (max !== i) {
    animation = {
      operation: 'change-color',
      positions: [i, max]
    };
    animations.push(animation);
    animation = {
      operation: 'revert-color',
      positions: [i, max]
    };
    animations.push(animation);
    swap(array, i, max, animations);
    heapRoot(array, max, animations);
  }
}

function heapSort(array, animations) {
  arrayLength = array.length;
  let i;

  for (i = Math.floor(arrayLength / 2); i >= 0; i -= 1) {
    heapRoot(array, i, animations);
  }

  for (i = array.length - 1; i > 0; i--) {
    swap(array, 0, i, animations);
    arrayLength--;
    heapRoot(array, 0, animations);
  }
  return animations;
}

export default function heapSortAnimations(array) {
  const animations = [];
  heapSort(array, animations);
  return animations;
}
