import { Spinner } from "@nextui-org/spinner";
import { Navbar } from "../components/UI/navbar";

export default function loading() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center mt-12">
        <Spinner />
      </div>
    </div>
  );
}
