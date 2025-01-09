import { Spinner } from "@nextui-org/react";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center mt-20">
      <Spinner size="lg" />
    </div>
  );
};

export default Loading;
