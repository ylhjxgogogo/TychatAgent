const { Worker } = require("worker_threads");
let count = 0;
//开启10个线程
for (var i = 0; i < 10; i++) {
  let worker = new Worker("node_worker.js", {
    workerData: 40,
  });
  worker.onmessage = (data) => {
    console.log(data);
    count++;
    if (count === 10) {
      console.timeEnd("test");
    }
  };
}
