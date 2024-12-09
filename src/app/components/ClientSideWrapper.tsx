import { ToastContainer } from "react-toastify";
import Loading from "./loading";
import Guard from "./Guard";

export default function ClientSideWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log({ children });
  return (
    <>
      {children}
      <Loading />
      <ToastContainer />
      <Guard />
    </>
  );
}
