import { useAuthStore } from "@/app/state/auth";
import { Task } from "@/app/types";
import { protectedHttp } from "./Http";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/tasks`;

export const getAllTasks = async () => {
  const data = await protectedHttp(baseUrl, {
    method: "GET",
  });
  return data;
};

export const createTask = async (task: Task) => {
  const data = await protectedHttp(baseUrl, {
    method: "POST",
    body: JSON.stringify(task),
  });
  return data;
};

export const getTask = async (id: number) => {
  const data = await protectedHttp(`${baseUrl}/${id}`, {
    method: "GET",
  });
  return data;
};

export const deleteTask = async (task: Task) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return Promise.reject("No token found");
  }
  const response = await fetch(`${baseUrl}/${task.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  const data = await response.json();
  return data;
};

export const updateTask = async (task: Task) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return Promise.reject("No token found");
  }
  const response = await fetch(`${baseUrl}/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  const data = await response.json();
  return data;
};

export const updateTaskStatus = async (task: Task, status: string) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return Promise.reject("No token found");
  }
  const response = await fetch(`${baseUrl}/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...task, status }),
  });
  const data = await response.json();
  return data;
};
