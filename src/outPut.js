function streamOutput(msg) {
  return new Promise((resolve, reject) => {
    const URL = "https://api.openai.com/v1/chat/completions";
    fetch(URL, {
      method: "POST", // 设置请求方法为POST
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer xxx",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: msg }],
        temperature: 0.7,
      }),
      // 传递信号对象以实现超时控制
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        resolve(data); // 成功时将结果传递给 resolve
      })
      .catch((error) => {
        reject(error); // 失败时将错误传递给 reject
      });
  });
}

export default streamOutput;
