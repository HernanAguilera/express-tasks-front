import { useAuthStore } from "@/app/state/auth";
import { Task } from "@/app/types";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/tasks`;
console.log({ baseUrl });

export const getAllTasks = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return [];
  }
  try {
    const response = await fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      return Promise.reject({
        error: "Something went wrong",
        code: response.status,
      });
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log({ error });
  }
};

export const createTask = async (task: Task) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return Promise.reject("No token found");
  }
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  const data = await response.json();
  return data;
};

export const getTask = async (id: number) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return Promise.reject("No token found");
  }
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
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
