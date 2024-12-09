"use client";
import { useState } from "react";
import { userRegistrationSchema } from "./userRegistration.schema";
import { register, RegisterData } from "@/http/Auth";
import { redirect } from "next/navigation";

type RegisterFormData = {
  name?: {
    _errors: string[];
  };
  email?: {
    _errors: string[];
  };
  password?: {
    _errors: string[];
  };
  confirmPassword?: {
    _errors: string[];
  };
};

enum RegisterFields {
  name = "name",
  email = "email",
  password = "password",
  confirmPassword = "confirmPassword",
}

export default function Register() {
  const [errors, setErrors] = useState<RegisterFormData>({});
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log({
      currentTarget: e.currentTarget,
      formData: formData.getAll("name"),
    });
    const { success, error } = userRegistrationSchema.safeParse(data);
    if (!success) {
      setErrors(error.format() as RegisterFormData);
      console.log(error.format());
      return;
    }

    const response = await register(data as RegisterData);
    console.log(response);
    // revalidatePath("/login");
    redirect("/login");
    // try {
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const getErrorMessage = (fieldName: RegisterFields): string[] => {
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
            getErrorMessage(RegisterFields.name).map((error, index) => (
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
            getErrorMessage(RegisterFields.email).map((error, index) => (
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
            getErrorMessage(RegisterFields.password).map((error, index) => (
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
            getErrorMessage(RegisterFields.confirmPassword).map(
              (error, index) => (
                <span key={index} className="text-red-500">
                  {error}
                </span>
              )
            )}
        </div>
        <button type="submit" className="w-full button">
          Register
        </button>
      </form>
    </div>
  );
}
