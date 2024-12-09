"use client";

import { useEffect, useState } from "react";
import { getAllTasks, updateTaskStatus, deleteTask } from "@/http/Task";
import Link from "next/link";
import { Task } from "./types";
import useTasksStore from "./state/tasks";
import { useAuthStore } from "./state/auth";
import { redirect } from "next/navigation";
import TaskComponent from "./components/Task";
import ClientSideWrapper from "./components/ClientSideWrapper";
import { useStore } from "zustand";

export default function Home() {
  const [filter, setFilter] = useState("");
  const [tasksFiltered, setTasksFiltered] = useState<Task[]>([]);

  const { tasks, setTasks } = useTasksStore();

  const { logout } = useStore(useAuthStore);

  useEffect(() => {
    getAllTasks()
      .then((tasks) => {
        updateTasksLists(tasks);
      })
      .catch((error) => {
        console.log({ error });
        if (error.code === 401) {
          logout();
          redirect("/login");
          return;
        }
      });
  }, []);

  const sortTasks = (tasks: Task[]) => {
    const sortedTasks = [...tasks];
    sortedTasks.sort((a, b) => {
      if (a.status === "pending" && b.status !== "pending") {
        return -1;
      }
      if (a.status !== "pending" && b.status === "pending") {
        return 1;
      }
      if (a.status === "in progress" && b.status !== "in progress") {
        return -1;
      }
      if (a.status !== "in progress" && b.status === "in progress") {
        return 1;
      }
      if (a.status === "completed" && b.status !== "completed") {
        return -1;
      }
      if (a.status !== "completed" && b.status === "completed") {
        return 1;
      }
      return 0;
    });
    return sortedTasks;
  };

  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setTasksFiltered(
      tasks.filter((task: Task) =>
        task.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const updateTasksLists = (tasks: Task[]) => {
    let newTasks = sortTasks(tasks);
    newTasks = newTasks.filter((task: Task) => task.status !== "deleted");
    setTasks(newTasks);
    setTasksFiltered(newTasks);
  };

  const handlePendingTask = (task: Task) => {
    updateTaskStatus(task, "pending").then((task) => {
      console.log({ task });
      getAllTasks().then((tasks) => updateTasksLists(tasks));
    });
  };

  const handleInProgressTask = (task: Task) => {
    updateTaskStatus(task, "in progress").then((task) => {
      console.log({ task });
      getAllTasks().then((tasks) => updateTasksLists(tasks));
    });
  };

  const handleCompleteTask = (task: Task) => {
    updateTaskStatus(task, "completed").then((task) => {
      console.log({ task });
      getAllTasks().then((tasks) => updateTasksLists(tasks));
    });
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

  // const getTaskClassName = (task: Task) => {
  //   switch (task.status) {
  //     case "pending":
  //       return "pending-task";
  //     case "in progress":
  //       return "in-progress-task";
  //     case "completed":
  //       return "completed-task";
  //     default:
  //       return "";
  //   }
  // };

  return (
    <ClientSideWrapper>
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
            className="w-full mb-8 border-0 focus:border-0 focus:outline-none rounded-3xl bg-gray-200 px-6 py-3 text-gray-900"
            value={filter}
            onChange={handleChangeFilter}
          />
          <div>
            <div className="flex flex-col gap-4">
              {tasksFiltered.map((task) => (
                // <div key={task.id} className="flex gap-x-2">
                //   <div className="flex flex-col w-full">
                //     <div
                //       className={`flex flex-col px-2 py-1 ${getTaskClassName(
                //         task
                //       )}`}
                //     >
                //       <div className={`text-xl font-bold }`}>{task.name}</div>
                //       <div className={`text-sm pb-2`}>{task.description}</div>
                //     </div>
                //     <div className="flex">
                //       <button
                //         className={" w-full pending-task"}
                //         onClick={() => handlePendingTask(task)}
                //         disabled={task.status === "pending"}
                //         title="Mark as pending"
                //       >
                //         <i className="bx bx-stopwatch" />
                //       </button>
                //       <button
                //         className=" w-full in-progress-task"
                //         onClick={() => handleInProgressTask(task)}
                //         disabled={task.status === "in progress"}
                //         title="Mark as in progress"
                //       >
                //         <i className="bx bx-run"></i>
                //       </button>
                //       <button
                //         className=" w-full completed-task"
                //         onClick={() => handleCompleteTask(task)}
                //         disabled={task.status === "completed"}
                //         title="Mark as completed"
                //       >
                //         <i className="bx bx-check-circle" />
                //       </button>
                //     </div>
                //   </div>
                //   <Link
                //     href={`/edit/${task.id}`}
                //     className="button info outline w-2/12 flex items-center justify-center"
                //   >
                //     <i className="bx bx-edit" />
                //   </Link>
                //   <button
                //     className="button danger outline w-2/12"
                //     onClick={() => handleDeleteTask(task)}
                //   >
                //     <i className="bx bx-trash" />
                //   </button>
                // </div>
                <TaskComponent
                  key={task.id}
                  task={task}
                  onPendingSet={handlePendingTask}
                  onInProgressSet={handleInProgressTask}
                  onCompletedSet={handleCompleteTask}
                  onDeleted={handleDeleteTask}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ClientSideWrapper>
  );
}
