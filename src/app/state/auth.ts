import { create } from "zustand";

export interface AuthState {
  token: string;
  setToken: (token: string) => void;
  clearToken: () => void;
  isAuthenticated: () => boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: "",
  setToken: (token: string) => {
    set({ token });
  },
  clearToken: () => {
    set({ token: "" });
  },
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
  login: (token: string) => {
    set({ token });
    localStorage.setItem("token", token);
  },
  logout: () => {
    set({ token: "" });
    localStorage.removeItem("token");
  },
}));
