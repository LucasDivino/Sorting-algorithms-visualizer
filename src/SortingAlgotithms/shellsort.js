import { addChange, addSwap, addRevert } from './helpers';

export default function animateShellSort(arr) {
  const animations = [];
  const len = arr.length;
  let gapSize = Math.floor(len / 2);

  while (gapSize > 0) {
    for (let i = gapSize; i < len; i++) {
      const temp = arr[i];
      let j = i;
      while (j >= gapSize && arr[j - gapSize] > temp) {
        addChange(animations, [j - gapSize, j]);
        addRevert(animations, [j - gapSize, j]);
        arr[j] = arr[j - gapSize];
        addSwap(animations, [j, arr[j - gapSize]]);
        j -= gapSize;
      }
      arr[j] = temp;
      addSwap(animations, [j, temp]);
    }
    gapSize = Math.floor(gapSize / 2);
  }
  return animations;
}
