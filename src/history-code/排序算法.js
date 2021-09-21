// 冒泡排序

// ---傻瓜式冒泡排序---
function bubbleSort1(arr) {
	let len = arr.length,
		tmp = 0;
	for (let i = 0; i < len - 1; i++) {
		for (let j = 0; j < len - 1 - i; j++) {
			if (arr[j] > arr[j + 1]) {
				tmp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = tmp;
			}
		}
	}
	return arr;
}

// ---进阶冒泡排序---
function bubbleSort(arr) {
	let len = arr.length;
	let low = 0,
		high = len - 1,
		por1 = 0
	let por2 = 0, tmp = 0;
	while (high - 1 > low) {
		for (let i = low; i < high; i++) {
			if (arr[i] > arr[i + 1]) {
				tmp = arr[i];
				arr[i] = arr[i + 1];
				arr[i + 1] = tmp;
				por1 = i;
			}
		}
		high = por1;
		for (let j = high; j > low; j--) {
			if (arr[j] < arr[j - 1]) {
				tmp = arr[j];
				arr[j] = arr[j - 1];
				arr[j - 1] = tmp;
				por2 = j;
			}
		}
		low = por2;
	}
	return arr;
}
console.log(bubbleSort([1, 4, 5, 2, 3, 0, 23]));
// 选择排序

function selectSort(arr) {
	let len = arr.length;
	let minIndex = 0,
		tmp = 0;
	for (let i = 0; i < len - 1; i++) {
		minIndex = i;
		for (let j = i + 1; j < len; j++) {
			if (arr[minIndex] > arr[j]) {
				minIndex = j;
			}
		}
		tmp = arr[i];
		arr[i] = arr[minIndex];
		arr[minIndex] = tmp;
	}
	return arr;
}

// 插入排序
//---普通版---
function insertSort(arr) {
	let len = arr.length;
	for (let i = 1; i < len; i++) {
		let key = arr[i];
		let j = i - 1;
		while (arr[j] > key) {
			arr[j + 1] = arr[j];
			j--;
		}
		arr[j + 1] = key;
	}
	return arr;
}

//---二分插入法---
function twoPointsInsertSort(arr) {
	let len = arr.length;
	for (let i = 1; i < len; i++) {
		let key = arr[i];
		let left = 0,
			right = i - 1;
		while (left <= right) {
			let tmp = parseInt((left + right) / 2);
			if (arr[i] < arr[tmp]) {
				right = tmp - 1;
			} else {
				left = tmp + 1;
			}
		}
		for (let f = i; f >= left; f--) {
			arr[f] = arr[f - 1];
		}
		arr[left] = key;
	}
	return arr;
}

// 归并排序

function mergeSort(arr) {
	let len = arr.length;
	if (arr.length < 2) {
		return arr;
	}
	let middle = Math.floor(len / 2);
	let left = arr.slice(0, middle);
	let right = arr.slice(middle);
	return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
	let result = [];
	while (left.length && right.length) {
		if (left[0] > right[0]) {
			result.push(right.shift());
		} else {
			result.push(left.shift());
		}
	}
	while (left.length) {
		result.push(left.shift());
	}
	while (right.length) {
		result.push(right.shift());
	}
	return result;
}

//希尔排序

function hillSort(arr, mode = 0) {
	//---方式一---
	if (mode) {
		var len = arr.length;
		for (
			var fraction = Math.floor(len / 2);
			fraction > 0;
			fraction = Math.floor(fraction / 2)
		) {
			for (var i = fraction; i < len; i++) {
				for (
					var j = i - fraction;
					j >= 0 && arr[j] > arr[fraction + j];
					j -= fraction
				) {
					var temp = arr[j];
					arr[j] = arr[fraction + j];
					arr[fraction + j] = temp;
				}
			}
		}
		return arr;
	} else {
		//---方式二---
		let len = arr.length;
		let gap = 1;
		while (gap < len / 3) {
			gap = gap * 3 + 1;
		}
		for (gap; gap > 0; gap = Math.floor(gap / 3)) {
			for (let i = gap; i < len; i++) {
				let key = arr[i];
				let j = i - gap;
				for (; j >= 0 && key < arr[j]; j -= gap) {
					arr[j + gap] = arr[j];
				}
				arr[j + gap] = key;
			}
		}
		return arr;
	}
}

//快速排序

//双指针法
function quickSortT(arr, left = 0, right = arr.length - 1) {
	let len = arr.length;
	if (left >= right) {
		return arr;
	}
	let base = left;
	let temp = 0;
	let key = arr[base];
	while (left < right) {
		while (right > left && arr[right] > arr[base]) {
			right--;
		}
		while (left < right && arr[left] <= arr[base]) {
			left++;
		}
		if (left < right) {
			temp = arr[right];
			arr[right] = arr[left];
			arr[left] = temp;
		}
	}
	arr[base] = arr[right];
	arr[right] = key;
	quickSortT(arr, base, left - 1);
	quickSortT(arr, left + 1, len - 1);
	return arr;
}

//方式二
function quickSort(arr) {
	let left = [],
		right = [];
	if (arr.length < 2) {
		return arr;
	}
	let minIndex = Math.floor(arr.length / 2);
	let min = arr.splice(minIndex, 1)[0];
	let len = arr.length;
	for (let i = 0; i < len; i++) {
		if (arr[i] < min) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}
	return quickSort(left).concat(min, quickSort(right));
}

//基数排序
function getMax(arr) {
	let max = arr[0];
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] > max) {
			max = arr[i];
		}
	}
	return (max + "").length;
}

function radixSort(arr) {
	let tempArray = [];
	let temp = [];
	let base = 0;
	let count = getMax(arr);
	for (let j = 0, n = 1; j < count; j++, n *= 10) {
		temp = [];
		for (let i = 0; i < arr.length; i++) {
			base = parseInt(arr[i] / n) % 10;
			if (!tempArray[base]) {
				tempArray[base] = [];
			}
			tempArray[base].push(arr[i]);
		}
		for (let f = 0; f < tempArray.length; f++) {
			let len = tempArray[f];
			if (len) {
				for (let tmp = 0; tmp < tempArray[f].length; tmp++) {
					temp.push(tempArray[f][tmp]);
				}
			}
		}
		tempArray = [];
		arr = temp;
		// console.log(temp.length);
	}
	return arr;
}

let arr = [3, 38, 38, 44, 15, 47, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(radixSort(arr));
