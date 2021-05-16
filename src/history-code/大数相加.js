function bigNumSub(a, b) {
  let res = [];
  let arr_a = String(a)
    .split("")
    .reverse();
  let arr_b = String(b)
    .split("")
    .reverse();
  let max, min;
  let temp;
  let flag = 0;
  if (Number(a) > Number(b)) {
    max = arr_a;
    min = arr_b;
  } else {
    max = arr_b;
    min = arr_a;
  }
  for (let i = 0; i < max.length; i++) {
    if (i < min.length) {
      temp = Number(max[i]) + Number(min[i]) + flag;
    } else {
      temp = Number(max[i]) + flag;
    }
    if (temp > 9) {
      flag = 1;
      res[i] = temp - 10;
      if (i === max.length - 1) {
        res[max.length] = 1;
      }
    } else {
      res.push(temp);
    }
  }
  return res.reverse().join("");
}

console.log(bigNumSub("12", "109"));
