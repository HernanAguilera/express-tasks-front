import { ZodFormattedError } from "zod";

export class ErrorManager {
  errors: ZodFormattedError<any>[] = [];

  constructor(errors: ZodFormattedError<any>[] = []) {
    this.errors = errors;
  }

  getErrorMessage(fieldName: string): string[] {
    return this.errors[fieldName]?._errors || [];
  }
}
