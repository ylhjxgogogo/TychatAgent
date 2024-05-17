let chunks = [
  new Uint8Array([0, 1, 2]),
  new Uint8Array([3, 4, 5]),
  new Uint8Array([6, 7, 8]),
];
function concat(arrays) {
  // ...your code...
  const totalLength = arrays.reduce((acc, value) => {
    return acc + value.length;
  }, 0);
  const chunkAll = new Uint8Array(totalLength); //默认以0填充
  let length = 0;
  for (let arr of arrays) {
    chunkAll.set(arr, length); //将数组 arr 中的内容复制到 chunkAll 中的位置 length 开始的地方
    length += arr.length;
  }
  console.log(chunkAll);
}
concat(chunks);
