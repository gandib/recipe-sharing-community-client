"use client";
import HomePageFeedCard from "./HomePageFeedCard";
import HomePageRecentPost from "./HomePageRecentPost";
import HomePageCreatePost from "./HomePageCreatePost";
import HomePageMyGroups from "./HomePageMyGroups";
import HomePageFollowing from "./HomePageFollowing";
import { IRecipe, TGroupMeta } from "@/src/types";
import HomeLeftSidebar from "./HomeLeftSidebar";
import { Input, Spinner } from "@nextui-org/react";
import { FieldValues, useForm } from "react-hook-form";
import { queryParams, TRecipeMeta } from "@/src/types";
import useDebounce from "@/src/hooks/debounce.hook";
import { getAllRecipes } from "@/src/services/Recipe";
import { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";

const HomePageCard = ({
  recipe,
  allGroups,
}: {
  recipe: IRecipe[];
  allGroups: TGroupMeta;
}) => {
  const [recipeData, setRecipeData] = useState<IRecipe[]>(recipe);
  const { register, handleSubmit, watch, setValue } = useForm();
  const searchText = useDebounce(watch("search"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchText) {
      setLoading(true);
    }
  }, [searchText]);

  useEffect(() => {
    if (recipe) {
      setRecipeData(recipe);
    }
    const query: queryParams[] = [];
    query.push({ name: "limit", value: 10 });
    query.push({ name: "searchTerm", value: searchText });

    const fetchData = async () => {
      const { data: allRecipes } = await getAllRecipes(query);
      setRecipeData(allRecipes);
      setLoading(false);
    };

    if (searchText) {
      setLoading(true);
      fetchData();
    } else {
      // setRecipeData(undefined);
    }
  }, [searchText, recipe]);

  const onSubmit = (data: FieldValues) => {};
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
      <div className="hidden flex-col lg:flex lg:col-span-1 gap-4">
        <HomeLeftSidebar />
        <div className="sticky top-20">
          <HomePageRecentPost title="Recent Posts" recipes={recipe} />
        </div>
      </div>

      <div className="md:col-span-2 mt-4 lg:mt-0">
        {/* create new post section */}
        <HomePageCreatePost />

        <div className="flex flex-col justify-center items-center my-2 w-full ">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <Input
              {...register("search")}
              aria-label="Search"
              placeholder="Search..."
              size="md"
              startContent={
                <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400 " />
              }
              color="default"
              type="text"
            />
          </form>
          {loading && <Spinner size="sm" className="my-2" />}
        </div>

        <div className=" mb-8">
          <HomePageFeedCard recipe={recipeData} />
          {/* <HomePageFeedCard /> */}
        </div>
      </div>

      <div className="hidden md:flex md:col-span-1 mt-4 lg:mt-0 flex-col gap-4">
        {/* my groups */}
        <HomePageMyGroups allGroups={allGroups} />

        {/* following */}
        <HomePageFollowing />
      </div>
    </div>
  );
};

export default HomePageCard;
