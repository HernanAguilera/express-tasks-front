"use client";

import { useRef, useState } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [deletedTasks, setDeletedTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ title, description });

    const newTask = {
      id: tasks.length + 1,
      title,
      description,
    };
    setTasks((tasks) => [...tasks, newTask]);
    setTitle("");
    setDescription("");
  };

  const handleDeleteTask = (task: Task) => {
    setTasks((tasks) => tasks.filter((t) => t.id !== task.id));
    setDeletedTasks((tasks) => [...tasks, task]);
  };

  const handleDeletePermanently = (task: Task) => {
    setDeletedTasks((tasks) => tasks.filter((t) => t.id !== task.id));
  };

  return (
    <div className="flex flex-col items-center h-screen mt-12">
      <div className="flex flex-col gap-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
        <div className="text-3xl font-bold mb-4">Next Tasks</div>
        <form onSubmit={handleCreateTask}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full form-input"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="w-full form-input"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <button type="submit" className="button primary">
            Create task
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
                <div>{task.title}</div>
                <div>{task.description}</div>
                <button className="button">Edit</button>
                <button
                  className="button"
                  onClick={() => handleDeleteTask(task)}
                >
                  Delete
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
                <button className="button">Restore</button>
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
