"use client";
import useTasksStore from "@/app/state/tasks";
import { taskSchema } from "@/app/Task.schema";
import { Task, TaskErrorsData, TaskFields } from "@/app/types";
import { getTask, updateTask } from "@/http/Task";
import Link from "next/link";
import { redirect } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function Edit({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState("");
  const [task, setTask] = useState<Task>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<TaskErrorsData>({});
  const getErrorMessage = (fieldName: TaskFields): string[] => {
    return errors[fieldName]?._errors || [];
  };
  const { tasks } = useTasksStore();
  useEffect(() => {
    params.then((params) => {
      const task = tasks.find((task: Task) => task.id === Number(params.id));
      if (task) {
        setTask(task);
        setName(task.name);
        setDescription(task.description);
        return;
      }
      getTask(Number(params.id))
        .then((task) => {
          setTask(task);
          setName(task.name);
          setDescription(task.description);
          console.log({ task });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

  const handleUpdateTask = (e: React.FormEvent<HTMLFormElement>) => {
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
      id: task?.id,
      name,
      description,
    };
    updateTask(newTask).then((task) => {
      console.log({ task });
      setName("");
      setDescription("");
      redirect("/");
    });
  };

  return (
    <div className="flex flex-col items-center h-screen mt-12">
      <div className="flex flex-col gap-4 w-11/12 sm:w-8/12 md:w-1/2 lg:w-1/2 xl:w-1/3">
        <div className="flex flex-row justify-between">
          <Link href="/" className="button p-2">
            <i className="bx bx-chevron-left p-2" />
          </Link>
          <div className="text-3xl font-bold mb-4">Editing</div>
        </div>
        <form onSubmit={handleUpdateTask} className="flex flex-col gap-4">
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
