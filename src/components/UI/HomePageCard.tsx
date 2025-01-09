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
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div className="hidden lg:flex lg:col-span-1">
        <HomePageTimeCard />
      </div>

      <div className="md:col-span-2 mt-4 lg:mt-0">
        {/* create new post section */}
        <HomePageCreatePost />

        <div className="grid gap-8 mb-8">
          <HomePageFeedCard recipe={recipe} />
          {/* <HomePageFeedCard /> */}
        </div>
      </div>

      <div className="hidden md:flex md:col-span-1 mt-4 lg:mt-0">
        <div>
          {/* my groups */}
          <HomePageMyGroups />

          {/* following */}
          <HomePageFollowing />
        </div>
      </div>
    </div>
  );
};

export default HomePageCard;
