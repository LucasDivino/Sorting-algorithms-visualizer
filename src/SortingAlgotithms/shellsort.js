export default function shellSort(arr) {
  const len = arr.length;
  let gapSize = Math.floor(len / 2);

  while (gapSize > 0) {
    for (let i = gapSize; i < len; i++) {
      const temp = arr[i];
      let j = i;

      while (j >= gapSize && arr[j - gapSize] > temp) {
        arr[j] = arr[j - gapSize];
        j -= gapSize;
      }
      arr[j] = temp;
    }
    gapSize = Math.floor(gapSize / 2);
  }
  return arr;
}