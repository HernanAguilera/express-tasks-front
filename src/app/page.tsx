"use client";

import { useState } from "react";
import { taskSchema } from "./Task.schema";

type Task = {
  id: number;
  title: string;
  description: string;
  status?: "pending" | "in progress" | "completed";
};

enum TaskFields {
  title = "title",
  description = "description",
}

type TaskErrorsData = {
  title?: {
    _errors: string[];
  };
  description?: {
    _errors: string[];
  };
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksDone, setTasksDone] = useState<Task[]>([]);
  const [deletedTasks, setDeletedTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState<TaskErrorsData>({});

  const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ title, description });

    setErrors(() => ({}));
    const { success, error } = taskSchema.safeParse({ title, description });
    console.log({ title, description, success, error: error?.format() });

    if (!success) {
      setErrors(error.format() as TaskErrorsData);
      return;
    }

    const newTask: Task = {
      id: tasks.length + 1,
      title,
      description,
      status: "pending",
    };
    setTasks((tasks) => [...tasks, newTask]);
    setTitle("");
    setDescription("");
  };

  const handlePendingTask = (task: Task) => {
    setTasks((tasks) =>
      tasks.map((t) => (t.id === task.id ? { ...task, status: "pending" } : t))
    );
  };

  const handleInProgressTask = (task: Task) => {
    setTasks((tasks) =>
      tasks.map((t) =>
        t.id === task.id ? { ...task, status: "in progress" } : t
      )
    );
  };

  const handleCompleteTask = (task: Task) => {
    setTasks((tasks) =>
      tasks.map((t) =>
        t.id === task.id ? { ...task, status: "completed" } : t
      )
    );
  };

  const handleDeleteTask = (task: Task) => {
    setTasks((tasks) => tasks.filter((t) => t.id !== task.id));
    setDeletedTasks((tasks) => [...tasks, task]);
  };

  const handleDeletePermanently = (task: Task) => {
    setDeletedTasks((tasks) => tasks.filter((t) => t.id !== task.id));
  };

  const getErrorMessage = (fieldName: TaskFields): string[] => {
    return errors[fieldName]?._errors || [];
  };

  return (
    <div className="flex flex-col items-center h-screen mt-12">
      <div className="flex flex-col gap-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
        <div className="text-3xl font-bold mb-4">Next Tasks</div>
        <form onSubmit={handleCreateTask}>
          <div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="w-full form-input"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            {errors?.title &&
              getErrorMessage(TaskFields.title).map((error, index) => (
                <p key={index} className="text-red-500">
                  {error}
                </p>
              ))}
          </div>
          <div>
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="w-full form-input"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            {errors?.description &&
              getErrorMessage(TaskFields.description).map((error, index) => (
                <p key={index} className="text-red-500">
                  {error}
                </p>
              ))}
          </div>
          <button
            type="submit"
            className="button primary flex items-center gap-2"
          >
            Create task <i className="bx bx-plus" />
          </button>
        </form>
        <input
          type="text"
          placeholder="Search tasks"
          className="w-full form-input"
        />
        <div>
          <div>
            {tasks.map((task) => (
              <div key={task.id} className="flex gap-4">
                <button
                  className="button text-red-500"
                  onClick={() => handlePendingTask(task)}
                  disabled={task.status === "pending"}
                >
                  <i className="bx bx-loader-alt bx-spin" />
                </button>
                <button
                  className="button secondary"
                  onClick={() => handleInProgressTask(task)}
                  disabled={task.status === "in progress"}
                >
                  <i className="bx bx-run"></i>
                </button>
                <button
                  className="button success"
                  onClick={() => handleCompleteTask(task)}
                  disabled={task.status === "completed"}
                >
                  <i className="bx bx-check-circle" />
                </button>
                <div>{task.title}</div>
                <div>{task.description}</div>
                <button
                  className="button danger"
                  onClick={() => handleDeleteTask(task)}
                >
                  <i className="bx bx-trash" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <div>
          <div>
            {deletedTasks.map((task) => (
              <div key={task.id} className="flex gap-4">
                <div>{task.title}</div>
                <div>{task.description}</div>
                <button className="button">Undone</button>
                <button
                  className="button"
                  onClick={() => handleDeletePermanently(task)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
