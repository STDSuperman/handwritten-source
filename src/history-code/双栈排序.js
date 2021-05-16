function stackSort(stack) {
	let arr = [];
	while (stack.length) {
		let temp = stack.pop();
		while (arr.length > 0 && temp > arr[arr.length - 1]) {
			stack.push(arr.pop());
		}
		arr.push(temp);
	}
}
stackSort([1, 5, 63, 2, 4, 6, 2]);
