"use client";
import { redirect, usePathname } from "next/navigation";
import { useAuthStore } from "../state/auth";
import { useStore } from "zustand";
import { useEffect } from "react";

const guestPaths = ["/login", "/register"];
const protectedPaths = ["/create", "/edit", "/"];

export default function Guard() {
  const pathname = usePathname();
  const { isAuthenticated } = useStore(useAuthStore);
  useEffect(() => {
    console.log({ pathname, isAuthenticated: isAuthenticated() });
    if (guestPaths.includes(pathname) && isAuthenticated()) {
      console.log("redirecting... /login");
      redirect("/login");
    }
    if (protectedPaths.includes(pathname) && !isAuthenticated()) {
      console.log("redirecting... /");
      redirect("/");
    }
  }, []);
  return <></>;
}
