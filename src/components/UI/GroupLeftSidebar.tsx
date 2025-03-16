import { Gem, Group, KeyRound, PencilRuler, Plus, UserPen } from "lucide-react";
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
              size={20}
              className="border-2 w-8 h-8 p-1 bg-default-300 rounded-full "
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
              size={20}
              className="border-2 w-8 h-8 p-1 bg-default-300 rounded-full "
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
              size={20}
              className="border-2 w-8 h-8 p-1 bg-default-300 rounded-full "
            />{" "}
            Groups
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupLeftSidebar;
