import { create } from "zustand";

export interface Task {
  id?: number;
  name: string;
  description: string;
  status?: "pending" | "in progress" | "completed" | "deleted";
}

export interface TasksState {
  tasks: Task[];
  tasksFiltered: Task[];
  tasksPending: Task[];
  tasksInProgress: Task[];
  tasksCompleted: Task[];
  setTasks: (tasks: Task[]) => void;
  setTasksFiltered: (tasksFiltered: Task[]) => void;
  setTasksPending: (tasksPending: Task[]) => void;
  setTasksInProgress: (tasksInProgress: Task[]) => void;
  setTasksCompleted: (tasksCompleted: Task[]) => void;
}

const useTasksStore = create<TasksState>((set) => ({
  tasks: [],
  tasksFiltered: [],
  tasksPending: [],
  tasksInProgress: [],
  tasksCompleted: [],
  setTasks: (tasks: Task[]) => {
    set({ tasks });
  },
  setTasksFiltered: (tasksFiltered: Task[]) => {
    set({ tasksFiltered });
  },
  setTasksPending: (tasksPending: Task[]) => {
    set({ tasksPending });
  },
  setTasksInProgress: (tasksInProgress: Task[]) => {
    set({ tasksInProgress });
  },
  setTasksCompleted: (tasksCompleted: Task[]) => {
    set({ tasksCompleted });
  },
}));

export default useTasksStore;
