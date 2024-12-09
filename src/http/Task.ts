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
  const data = await protectedHttp(`${baseUrl}/${task.id}`, {
    method: "DELETE",
    body: JSON.stringify(task),
  });
  return data;
};

export const updateTask = async (task: Task) => {
  const data = await protectedHttp(`${baseUrl}/${task.id}`, {
    method: "PUT",
    body: JSON.stringify(task),
  });
  return data;
};

export const updateTaskStatus = async (task: Task, status: string) => {
  const data = await protectedHttp(`${baseUrl}/${task.id}`, {
    method: "PUT",
    body: JSON.stringify({ ...task, status }),
  });
  return data;
};
