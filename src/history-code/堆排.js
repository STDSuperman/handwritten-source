function heapSort(arr) {
  /**建堆 */
  let len = arr.length;
  let temp;
  for (let i = len / 2 - 1; i >= 0; i--) {
    heapify(arr, i, len);
  }

  /**开始排序 */
  for (let i = len - 1; i > 0; i--) {
    /**先交换 */
    temp = arr[i];
    arr[i] = arr[0];
    arr[0] = temp;
    heapify(arr, 0, i);
  }
}

function heapify(arr, pos, len) {
  let child = pos * 2 + 1;
  let temp = arr[pos];
  while (child < len) {
    /**如果右边的较大则采用右边的 */
    if (child + 1 < len && arr[child + 1] > arr[child]) {
      child += 1;
    }
    if (arr[pos] < arr[child]) {
      arr[pos] = arr[child];
      pos = child;
      child = pos * 2 + 1;
    } else {
      break;
    }
    arr[pos] = temp;
  }
}

let arr = [1, 3, 45, 24, 23, 4, 62, 23, 2, 21, 312, 1];
heapSort(arr);
console.log(arr);
