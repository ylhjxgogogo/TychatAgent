import { create } from "zustand";
const useStore = create(() => {
  return {
    data: "",
  };
});
export const addMessage = (data) => {
  useStore.setState((state) => ({
    ...state.data,
    data,
  }));
};

export default useStore;
