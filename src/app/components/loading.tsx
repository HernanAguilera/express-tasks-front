import { useStore } from "zustand";
import useRequestStore from "../state/request";

export default function Loading() {
  const { isLoading } = useStore(useRequestStore);

  console.log({ isLoading });

  return isLoading ? (
    <div className="flex flex-col items-center justify-center h-screen absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50">
      <i className="bx bx-loader-alt bx-spin bx-3x text-3xl shadow-lg"></i>
      <h1 className="text-3xl font-bold mb-4 shadow-lg">Loading... </h1>
    </div>
  ) : null;
}
