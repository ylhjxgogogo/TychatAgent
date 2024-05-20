import { create } from "zustand";
const useStore = create(() => {
  return {
    messages: [
      {
        role: "system",
        content: "你好，有什么可以帮助您！",
      },
    ],
  };
});
export const addMessage = (message) => {
  useStore.setState((state) => ({
    messages: [...state.messages, message],
  }));
};
export const updateLastMessage = (content) =>
  useStore.setState((state) => {
    const messages = [...state.messages];
    messages[messages.length - 1].content += content;
    return { messages };
  });

export default useStore;
