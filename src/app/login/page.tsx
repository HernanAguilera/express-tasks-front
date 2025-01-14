"use client";
import { use, useEffect, useState } from "react";
import { userLoginSchema } from "./userLogin.schema";
import { login, LoginData, TokenData } from "@/http/Auth";
import { redirect } from "next/navigation";
import { useAuthStore } from "../state/auth";
import { notifyError, notifySuccess } from "../utils/notifications";
import { ToastContainer } from "react-toastify";
import { useStore } from "zustand";

type LoginErrorsData = {
  email?: {
    _errors: string[];
  };
  password?: {
    _errors: string[];
  };
};

enum LoginFields {
  email = "email",
  password = "password",
}

export default function Login() {
  const [errors, setErrors] = useState<LoginErrorsData>({});
  const { login: loginUser } = useStore(useAuthStore);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors(() => ({}));
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const { success, error } = userLoginSchema.safeParse(data);

    if (!success) {
      setErrors(error.format() as LoginErrorsData);
      return;
    }

    const response = await login(data as LoginData);
    if (!response.token) {
      notifyError("Invalid credentials");
      return;
    }
    loginUser(response.token);
    notifySuccess("Login successful");
    redirect("/");
  };

  const getErrorMessage = (fieldName: LoginFields): string[] => {
    return errors[fieldName]?._errors || [];
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form
        className="flex flex-col gap-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
        onSubmit={handleSubmit}
      >
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`form-input ${errors?.email ? "error" : ""}`}
          />
          {errors?.email &&
            getErrorMessage(LoginFields.email).map((error, index) => (
              <p key={index} className="text-red-500">
                {error}
              </p>
            ))}
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`form-input ${errors?.password ? "error" : ""}`}
          />
          {errors?.password &&
            getErrorMessage(LoginFields.password).map((error, index) => (
              <p key={index} className="text-red-500">
                {error}
              </p>
            ))}
        </div>
        <button type="submit" className="w-full button light">
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
