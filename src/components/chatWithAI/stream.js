async function stream(msg, updateMessage) {
  const URL = "https://api.openai.com/v1/chat/completions";
  const env = localStorage.getItem("env");
  const OPENAI_API_KEY = JSON.parse(env).OPENAI_API_KEY;
  try {
    let controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      console.error("Request timed out");
    }, 10000);
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: msg,
        stream: true,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    // dom.innerText = "";
    // setAnswer("");
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const chunkString = decoder.decode(value);
      const lines = chunkString.split("\n");
      const parsedLines = lines
        .map((line) => line.replace(/^data: /, "").trim()) // Remove the "data: " prefix
        .filter((line) => line !== "" && line !== "[DONE]") // Remove empty lines and "[DONE]"
        .map((line) => JSON.parse(line)); // Parse the JSON string
      for (const parsedLine of parsedLines) {
        const { choices } = parsedLine;
        const { delta } = choices[0];
        const { content } = delta;
        // Update the UI with the new content
        if (content) {
          updateMessage(content);
        }
      }
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

export default stream;
