import { publicHttp } from "./Http";

export type TokenData = {
  token: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  email: string;
  password: string;
  name: string;
  passwordConfirmation: string;
};

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

export const login = async (user: LoginData) => {
  const data = await publicHttp(`${baseUrl}/login`, {
    method: "POST",
    body: JSON.stringify(user),
  });
  return data;
};

export const register = async (user: RegisterData) => {
  const data = await publicHttp(`${baseUrl}/register`, {
    method: "POST",
    body: JSON.stringify(user),
  });
  return data;
};
