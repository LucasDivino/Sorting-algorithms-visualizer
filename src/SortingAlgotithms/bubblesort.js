export default function bubbleSortAnimations(array) {
  const animations = [];
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < array.length - 1; i++) {
      // change color
      let animation = {
        operation: 'change-color',
        positions: [i, i + 1]
      };
      animations.push(animation);
      // swap
      if (array[i] > array[i + 1]) {
        animation = {
          operation: 'swap',
          positions: [i, array[i + 1]]
        };
        animations.push(animation);
        animation = {
          operation: 'swap',
          positions: [i + 1, array[i]]
        };
        animations.push(animation);
        const tmp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = tmp;
        swapped = true;
      }

      // revert color
      animation = {
        operation: 'revert-color',
        positions: [i, i + 1]
      };
      animations.push(animation);
    }
  } while (swapped);
  return animations;
}
