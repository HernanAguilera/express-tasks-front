import useRequestStore from "@/app/state/request";
import { useStore } from "zustand";

export default async function http<T>(url: string, options: RequestInit) {
  const { setState } = useRequestStore;
  setState({ isLoading: true });
  const response = await fetch(url, options);
  setState({ isLoading: false });
  return response;
}

export async function protectedHttp<T>(url: string, options: RequestInit) {
  const token = localStorage.getItem("token");
  if (!token) {
    return Promise.reject("No token found");
  }
  options.headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };
  const response = await http(url, options);
  if (!response.ok) {
    console.log({ response });
    return Promise.reject({
      error: "Something went wrong",
      code: response.status,
    });
  }
  const data = await response.json();
  return data;
}

export async function publicHttp<T>(url: string, options: RequestInit) {
  const response = await http(url, options);
  const data = await response.json();
  return data;
}
