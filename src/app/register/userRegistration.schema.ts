import * as z from "zod";

export const userRegistrationSchema = z.object({
  name: z
    .string({ required_error: "This field is required" })
    .min(1, "This field is required"),
  email: z
    .string({ required_error: "This field is required" })
    .email({
      message: "Invalid email",
    })
    .min(1, "This field is required"),
  password: z.string().min(1, "This field is required"),
  confirmPassword: z.string().min(1, "This field is required"),
});
