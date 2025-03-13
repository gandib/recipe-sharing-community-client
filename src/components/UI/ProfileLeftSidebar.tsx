import { Gem, KeyRound, UserPen } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const ProfileLeftSidebar = ({
  setActiveTab,
}: {
  setActiveTab: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="w-full min-h-[200px] sticky top-20 bg-default-100 rounded p-4">
      <h1 className=" font-bold pb-4">Profile Links</h1>
      <div className="flex flex-col gap-4">
        <div>
          <button
            className="flex justify-center items-center gap-2 font-semibold"
            onClick={() => setActiveTab("Update Profile")}
          >
            <UserPen
              size={20}
              className="border-2 w-8 h-8 p-1 bg-default-300 rounded-full "
            />
            Update Profile
          </button>
        </div>
        <div>
          <button
            className="flex justify-center items-center gap-2 font-semibold"
            onClick={() => setActiveTab("Get Membership")}
          >
            <Gem
              size={20}
              className="border-2 w-8 h-8 p-1 bg-default-300 rounded-full "
            />
            Get Membership
          </button>
        </div>
        <div>
          <button
            className="flex justify-center items-center gap-2 font-semibold"
            onClick={() => setActiveTab("Change Password")}
          >
            <KeyRound
              size={20}
              className="border-2 w-8 h-8 p-1 bg-default-300 rounded-full "
            />{" "}
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileLeftSidebar;
