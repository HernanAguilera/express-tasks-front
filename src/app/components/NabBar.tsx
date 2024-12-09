"use client";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useAuthStore } from "../state/auth";
import "./NavBar.css";
import { useStore } from "zustand";

export default function Nabar() {
  const pathname = usePathname();
  const { isAuthenticated, logout } = useStore(useAuthStore);

  const isActive = (routePath: string) => {
    return pathname === routePath ? "active" : "";
  };

  const handleLogout = () => {
    logout();
    redirect("/login");
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {isAuthenticated() ? (
          <Link className={`item ${isActive("/")}`} href="/">
            Home
          </Link>
        ) : (
          <div></div>
        )}
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {!isAuthenticated() ? (
              <>
                <li>
                  <Link href="/login" className={`item ${isActive("/login")}`}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className={`item ${isActive("/register")}`}
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <a
                  href="#"
                  onClick={handleLogout}
                  className={`item ${isActive("/logout")}`}
                >
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
