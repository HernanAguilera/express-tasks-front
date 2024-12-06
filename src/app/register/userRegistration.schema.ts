import * as z from "zod";

export const userRegistrationSchema = z.object({
  name: z.string({ required_error: "This field is required" }),
  email: z.string({ required_error: "This field is required" }).email({
    message: "Invalid email",
  }),
  password: z.string(),
  confirmPassword: z.string(),
});
