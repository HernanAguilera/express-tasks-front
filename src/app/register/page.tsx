"use client";
import { useState } from "react";
import { userRegistrationSchema } from "./userRegistration.schema";
import * as z from "zod";

type RegisterFormData = z.infer<typeof userRegistrationSchema>;

export default function Register() {
  const [errors, setErrors] = useState({});
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    console.log({
      currentTarget: e.currentTarget,
      formData: formData.getAll("name"),
    });
    const { success, error } = userRegistrationSchema.safeParse(formData);
    if (!success) {
      setErrors(error.format());
      console.log(error.format());
      return;
    }
  };

  const getErrorMessage = (fieldName: string): string[] => {
    return errors[fieldName]?._errors || [];
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      <form
        className="flex flex-col gap-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
        onSubmit={handleSubmit}
      >
        <div>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className={`form-input ${errors?.name ? "error" : ""}`}
          />
          {errors?.name &&
            getErrorMessage("name").map((error, index) => (
              <p key={index} className="text-red-500">
                {error}
              </p>
            ))}
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`form-input ${errors?.email ? "error" : ""}`}
          />
          {errors?.email &&
            getErrorMessage("email").map((error, index) => (
              <span key={index} className="text-red-500">
                {error}
              </span>
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
            getErrorMessage("email").map((error, index) => (
              <span key={index} className="text-red-500">
                {error}
              </span>
            ))}
        </div>
        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className={`form-input ${errors?.confirmPassword ? "error" : ""}`}
          />
          {errors?.confirmPassword &&
            getErrorMessage("email").map((error, index) => (
              <span key={index} className="text-red-500">
                {error}
              </span>
            ))}
        </div>
        <button type="submit" className="w-full button">
          Register
        </button>
      </form>
    </div>
  );
}
