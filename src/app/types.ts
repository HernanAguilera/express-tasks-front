export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type Task = {
  id?: number;
  name: string;
  description: string;
  status?: "pending" | "in progress" | "completed" | "deleted";
};

export type TaskErrorsData = {
  name?: {
    _errors: string[];
  };
  description?: {
    _errors: string[];
  };
};

export enum TaskFields {
  name = "name",
  description = "description",
}
