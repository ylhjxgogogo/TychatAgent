console.time("test");
let count = 0;
//开启10个线程
for (var i = 0; i < 10; i++) {
  let worker = new SharedWorker("share.js");
  //只要指向的是同一个share.js，它们共用一个线程，所有可以实现跨标签页通信
  worker.port.postMessage(40);
  worker.port.onmessage = (event) => {
    console.log(event.data);
    count++;
    if (count === 10) {
      console.timeEnd("test");
    }
  };
}
