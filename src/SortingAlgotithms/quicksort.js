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
function partition(array, left, right, animations) {
  const pivot = array[Math.floor((right + left) / 2)];
  let animation;
  let i = left;
  let j = right;
  while (i <= j) {
    while (array[i] < pivot) {
      animation = {
        operation: 'change-color',
        positions: [i, Math.floor((right + left) / 2)]
      };
      animations.push(animation);
      animation = {
        operation: 'revert-color',
        positions: [i, Math.floor((right + left) / 2)]
      };
      animations.push(animation);
      i++;
    }
    while (array[j] > pivot) {
      animation = {
        operation: 'change-color',
        positions: [j, Math.floor((right + left) / 2)]
      };
      animations.push(animation);
      animation = {
        operation: 'revert-color',
        positions: [j, Math.floor((right + left) / 2)]
      };
      animations.push(animation);
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
