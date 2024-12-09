import * as z from "zod";

export const taskSchema = z.object({
  name: z
    .string({ required_error: "This field is required" })
    .min(1, "This field cannot be empty"),
  description: z
    .string({ required_error: "This field is required" })
    .min(1, "This field cannot be empty"),
  status: z.enum(["pending", "in progress", "completed"]).optional(),
});
