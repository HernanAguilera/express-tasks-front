"use client";

import { useEffect, useState } from "react";
import { taskSchema } from "../Task.schema";
import { createTask } from "@/http/Task";
import { redirect } from "next/navigation";
import Link from "next/link";

type Task = {
  id?: number;
  name: string;
  description: string;
  status?: "pending" | "in progress" | "completed" | "deleted";
};

enum TaskFields {
  name = "name",
  description = "description",
}

type TaskErrorsData = {
  name?: {
    _errors: string[];
  };
  description?: {
    _errors: string[];
  };
};

export default function Create() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState<TaskErrorsData>({});

  const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ name, description });

    setErrors(() => ({}));
    const { success, error } = taskSchema.safeParse({ name, description });
    console.log({ name, description, success, error: error?.format() });

    if (!success) {
      setErrors(error.format() as TaskErrorsData);
      return;
    }

    const newTask: Task = {
      name,
      description,
      status: "pending",
    };
    createTask(newTask).then((task) => {
      console.log({ task });
      setName("");
      setDescription("");
      redirect("/");
    });
  };

  const getErrorMessage = (fieldName: TaskFields): string[] => {
    return errors[fieldName]?._errors || [];
  };

  return (
    <div className="flex flex-col items-center h-screen mt-12">
      <div className="flex flex-col gap-4 w-11/12 sm:w-8/12 md:w-1/2 lg:w-1/2 xl:w-1/3">
        <div className="flex flex-row justify-between">
          <Link href="/" className="button p-2">
            <i className="bx bx-chevron-left p-2" />
          </Link>
          <div className="text-3xl font-bold mb-4">New Task</div>
        </div>
        <form onSubmit={handleCreateTask} className="flex flex-col gap-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full form-input"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            {errors?.name &&
              getErrorMessage(TaskFields.name).map((error, index) => (
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
          <div className="flex justify-end">
            <button
              type="submit"
              className="button primary flex items-center gap-2 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 justify-center"
            >
              Save <i className="bx bx-save" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
