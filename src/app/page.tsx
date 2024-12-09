"use client";

import { useEffect, useState } from "react";
import { taskSchema } from "./Task.schema";
import { getAllTasks, createTask, deleteTask } from "@/http/Task";
import Link from "next/link";

type Task = {
  id?: number;
  name: string;
  description: string;
  status?: "pending" | "in progress" | "completed" | "deleted";
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getAllTasks().then((tasks) => {
      setTasks(tasks.filter((task: Task) => task.status !== "deleted"));
    });
  }, []);

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
    deleteTask(task).then((res) => {
      console.log({ res });
      getAllTasks()
        .then((tasks) => setTasks(tasks.filter((t: Task) => t.id !== task.id)))
        .finally(() => {
          // setDeletedTasks((tasks) => [...tasks, task]);
        });
    });
  };

  return (
    <div className="flex flex-col items-center h-screen mt-12">
      <div className="flex flex-col gap-4 w-11/12 sm:w-8/12 md:w-1/2 lg:w-1/2 xl:w-1/3">
        <div className="flex flex-row justify-between">
          <div className="text-3xl font-bold mb-4">Tasks</div>
          <Link href="/create" className="button p-2">
            <i className="bx bx-plus p-2" />
          </Link>
        </div>
        <input
          type="text"
          placeholder="Search tasks"
          className="w-full form-input mb-8"
        />
        <div>
          <div className="flex flex-col gap-4">
            {tasks.map((task) => (
              <div key={task.id} className="flex gap-x-2">
                <div className="flex flex-col gap-2 w-full">
                  <div>{task.name}</div>
                  <div>{task.description}</div>
                  <div className="flex">
                    <button
                      className="button text-red-500 w-full"
                      onClick={() => handlePendingTask(task)}
                      disabled={task.status === "pending"}
                    >
                      <i className="bx bx-loader-alt bx-spin" />
                    </button>
                    <button
                      className="button secondary w-full"
                      onClick={() => handleInProgressTask(task)}
                      disabled={task.status === "in progress"}
                    >
                      <i className="bx bx-run"></i>
                    </button>
                    <button
                      className="button success w-full"
                      onClick={() => handleCompleteTask(task)}
                      disabled={task.status === "completed"}
                    >
                      <i className="bx bx-check-circle" />
                    </button>
                  </div>
                </div>
                <button
                  className="button danger w-1/6"
                  onClick={() => handleDeleteTask(task)}
                >
                  <i className="bx bx-trash" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
