import { Spinner } from "@nextui-org/react";
import { Navbar } from "../components/UI/navbar";

export default function loading() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center mt-20">
        <Spinner />
      </div>
    </div>
  );
}
