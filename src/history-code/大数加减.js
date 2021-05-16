function bigNumAdd(a, b) {
  let res = [],
    max = [],
    min = [];
  let str1,
    str2,
    temp,
    flag = 0;
  str1 = String(a);
  str2 = String(b);
  if (Number(a) > Number(b)) {
    max = str1.split("").reverse();
    min = str2.split("").reverse();
  } else {
    max = str2.split("").reverse();
    min = str1.split("").reverse();
  }
  for (let i = 0; i < max.length; i++) {
    if (i < min.length) {
      temp = Number(max[i]) + Number(min[i]) + flag;
    } else {
      temp = Number(max[i]) + flag;
    }
    if (temp > 9) {
      res[i] = temp - 10;
      flag = 1;
      if (i == max.length - 1) {
        res[max.length] = 1;
      }
    } else {
      res.push(temp);
      flag = 0;
    }
  }
  return res.reverse().join("");
}
console.log(bigNumAdd("11111133737837837838783", "4242442378378378"));

function bigNumSub(a, b) {
  let res = [],
    max = [],
    min = [];
  let str1,
    str2,
    temp,
    flag = 0,
    desc = 1;
  str1 = String(a);
  str2 = String(b);
  if (Number(a) > Number(b)) {
    max = str1.split("").reverse();
    min = str2.split("").reverse();
  } else {
    max = str2.split("").reverse();
    min = str1.split("").reverse();
    desc = -1;
  }

  for (let i = 0; i < max.length; i++) {
    if (i < min.length) {
      temp = temp = Number(max[i]) - Number(min[i]) + flag;
    } else {
      temp = temp = Number(max[i]) + flag;
    }

    if (temp <= 0) {
      res[i] = temp + 10;
      flag = -1;
      if (i == max.length - 1) {
        res[max.length - 1] = "";
      }
    } else {
      res.push(temp);
      flag = 0;
    }
  }
  return desc < 0 ? "-" + res.reverse().join("") : res.reverse().join("");
}
console.log(bigNumSub("9999999999999999999", "1111111111111111111"));
