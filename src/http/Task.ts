type Task = {
  id?: number;
  name: string;
  description: string;
  status?: "pending" | "in progress" | "completed" | "deleted";
};

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
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
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
  const response = await fetch(`${baseUrl}/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const data = await response.json();
  return data;
};
