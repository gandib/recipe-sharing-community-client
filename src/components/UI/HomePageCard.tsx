import HomePageFeedCard from "./HomePageFeedCard";
import HomePageRecentPost from "./HomePageRecentPost";
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
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
      <div className="hidden flex-col lg:flex lg:col-span-1">
        <HomePageRecentPost recipes={recipe} />
      </div>

      <div className="md:col-span-2 mt-4 lg:mt-0">
        {/* create new post section */}
        <HomePageCreatePost />

        <div className=" mb-8">
          <HomePageFeedCard recipe={recipe} />
          {/* <HomePageFeedCard /> */}
        </div>
      </div>

      <div className="hidden md:flex md:col-span-1 mt-4 lg:mt-0">
        <div className="w-full">
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
