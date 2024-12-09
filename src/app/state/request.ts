import { createStore } from "zustand/vanilla";

export interface RequestState {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useRequestStore = createStore<RequestState>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => {
    set({ isLoading });
  },
}));

export default useRequestStore;
