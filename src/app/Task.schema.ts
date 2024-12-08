import * as z from "zod";

export const taskSchema = z.object({
  title: z
    .string({ required_error: "This field is required" })
    .min(1, "This field cannot be empty"),
  description: z
    .string({ required_error: "This field is required" })
    .min(1, "This field cannot be empty"),
  // dueDate: z
  //   .string({ required_error: "This field is required" })
  //   .min(1, "This field cannot be empty"),
});