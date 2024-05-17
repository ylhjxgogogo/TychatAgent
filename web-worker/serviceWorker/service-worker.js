//service worker可以对特点域的资源进行缓存，因为可以拦截fetch
//这种缓存与http cache作用方式不同，后者是ResponseHeader控制的，由server主导
//而前者是前端js代码控制的
//当然也可以用在线程中做一些计算，只不过webworker更合适
//install事件。在第一次注册时会被触发
//这里在install时作了初始化，将两个资源添加到cache中
//cache是浏览器内置的缓存对象，addALL会立即请求该资源并进行缓存
self.addEventListener("install", function (event) {
  console.log("install事件");
  event.waitUntil(
    caches.open("v1").then(function (cache) {
      return cache.addAll(["./api.json"]);
    })
  );
});

// activate事件，在符合scope的页面打开后，就会激活，注意install只有一次，但是激活会有很多个页面激活
//  也可以将一些初始化操作放到active中
self.addEventListener("activate", (event) => {
  console.log("activate事件，一般是新打开了页面", event);
});
// fetch事件，拦截fetch方法，当页面调用fetch方法，就会被拦截
//  这里的逻辑是结合install中的缓存设置，来判断fetch的资源是否命中缓存实现加速，否则才真正调用fetch
self.addEventListener("fetch", async (event) => {
  console.log("拦截fetch", event);
  console.log(event.request.url);
  const res = await caches.match(event.request.url);

  if (res) {
    console.log("命中缓存啦");
    return res;
  } else {
    console.log("fetch新请求啦");
    return fetch(event.request);
  }
});
// 接收来自主线程的消息，并往主线程发送消息
self.addEventListener("message", function (e) {
  console.log("主线程传到service worker", e.data);
  e.data.id++;
  setTimeout(() => {
    e.source.postMessage(e.data);
  }, 5000);
});
