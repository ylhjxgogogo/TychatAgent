import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
const useStore = create()(
  persist(
    (set, get) => {
      return {
        messages: [
          // {
          //   role: "system",
          //   content: "你好，有什么可以帮助您！",
          // },
        ],
      };
    },
    {
      name: "messages",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
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
