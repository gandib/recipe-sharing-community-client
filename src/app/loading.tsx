import { Spinner } from "@nextui-org/react";
import { Navbar } from "../components/UI/navbar";
import { NavbarLower } from "../components/UI/NavbarLower";

export default function loading() {
  return (
    <div>
      <NavbarLower />
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    </div>
  );
}
