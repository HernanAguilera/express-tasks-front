import * as z from "zod";

export const userLoginSchema = z.object({
  email: z
    .string({ required_error: "This field is required" })
    .min(1, "This field cannot be empty")
    .email({
      message: "Invalid email",
    }),
  password: z
    .string({ required_error: "This field is required" })
    .min(1, "This field cannot be empty"),
});
