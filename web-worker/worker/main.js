console.time("test");
let count = 0;
//开启10个线程
for (var i = 0; i < 10; i++) {
  let worker = new Worker("work.js");
  worker.postMessage(40);
  worker.addEventListener("message", (event) => {
    count++;
    if (count === 10) {
      console.timeEnd("test");
    }
    worker.terminate();
  });
}
