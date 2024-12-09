import Link from "next/link";
import { Task } from "../types";

export default function TaskComponent({
  task,
  onPendingSet,
  onInProgressSet,
  onCompletedSet,
  onDeleted,
}: {
  task: Task;
  onPendingSet: (task: Task) => void;
  onInProgressSet: (task: Task) => void;
  onCompletedSet: (task: Task) => void;
  onDeleted: (task: Task) => void;
}) {
  const handlePendingTask = (task: Task) => {
    onPendingSet(task);
  };

  const handleInProgressTask = (task: Task) => {
    onInProgressSet(task);
  };

  const handleCompleteTask = (task: Task) => {
    onCompletedSet(task);
  };

  const handleDeleteTask = (task: Task) => {
    onDeleted(task);
  };

  const getTaskClassName = (task: Task) => {
    switch (task.status) {
      case "pending":
        return "pending-task";
      case "in progress":
        return "in-progress-task";
      case "completed":
        return "completed-task";
      default:
        return "";
    }
  };

  return (
    <div className="flex gap-x-2">
      <div className="flex flex-col w-full">
        <div className={`flex flex-col px-2 py-1 ${getTaskClassName(task)}`}>
          <div className={`text-xl font-bold }`}>{task.name}</div>
          <div className={`text-sm pb-2`}>{task.description}</div>
        </div>
        <div className="flex">
          <button
            className={" w-full pending-task"}
            onClick={() => handlePendingTask(task)}
            disabled={task.status === "pending"}
            title="Mark as pending"
          >
            <i className="bx bx-stopwatch" />
          </button>
          <button
            className=" w-full in-progress-task"
            onClick={() => handleInProgressTask(task)}
            disabled={task.status === "in progress"}
            title="Mark as in progress"
          >
            <i className="bx bx-run"></i>
          </button>
          <button
            className=" w-full completed-task"
            onClick={() => handleCompleteTask(task)}
            disabled={task.status === "completed"}
            title="Mark as completed"
          >
            <i className="bx bx-check-circle" />
          </button>
        </div>
      </div>
      <Link
        href={`/edit/${task.id}`}
        className="button info outline w-2/12 flex items-center justify-center"
      >
        <i className="bx bx-edit" />
      </Link>
      <button
        className="button danger outline w-2/12"
        onClick={() => handleDeleteTask(task)}
      >
        <i className="bx bx-trash" />
      </button>
    </div>
  );
}
