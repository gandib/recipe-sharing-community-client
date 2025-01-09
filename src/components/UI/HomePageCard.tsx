import HomePageFeedCard from "./HomePageFeedCard";
import HomePageTimeCard from "./HomePageTimeCard";
import HomePageCreatePost from "./HomePageCreatePost";
import HomePageMyGroups from "./HomePageMyGroups";
import HomePageFollowing from "./HomePageFollowing";
import { IRecipe } from "@/src/types";

const HomePageCard = ({
  recipe,
}: {
  recipe: { result: IRecipe[]; meta: any };
}) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-1">
        <HomePageTimeCard />
      </div>

      <div className="col-span-2">
        {/* create new post section */}
        <HomePageCreatePost />

        <div className="grid gap-8 mb-8">
          <HomePageFeedCard recipe={recipe} />
          {/* <HomePageFeedCard /> */}
        </div>
      </div>

      <div className="col-span-1">
        {/* my groups */}
        <HomePageMyGroups />

        {/* following */}
        <HomePageFollowing />
      </div>
    </div>
  );
};

export default HomePageCard;
