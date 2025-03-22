import { Group, PencilRuler, Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const GroupLeftSidebar = ({
  setActiveTab,
}: {
  setActiveTab: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="w-full min-h-[200px] bg-default-100 rounded p-4">
      <h1 className=" font-bold pb-4">Group Links</h1>
      <div className="flex flex-col gap-4">
        <div>
          <button
            className="flex justify-center items-center gap-2 font-semibold"
            onClick={() => setActiveTab("Create Group")}
          >
            <Plus
              className="border-2 w-8 h-8 p-1 bg-default-300 rounded-full "
              size={20}
            />
            Create Group
          </button>
        </div>
        <div>
          <button
            className="flex justify-center items-center gap-2 font-semibold"
            onClick={() => setActiveTab("Update Group")}
          >
            <PencilRuler
              className="border-2 w-8 h-8 p-1 bg-default-300 rounded-full "
              size={20}
            />
            Update Group
          </button>
        </div>
        <div>
          <button
            className="flex justify-center items-center gap-2 font-semibold"
            onClick={() => setActiveTab("Groups")}
          >
            <Group
              className="border-2 w-8 h-8 p-1 bg-default-300 rounded-full "
              size={20}
            />{" "}
            Groups
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupLeftSidebar;
