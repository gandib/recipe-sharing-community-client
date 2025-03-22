"use client";
import { Input, Spinner } from "@nextui-org/react";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import HomePageFeedCard from "./HomePageFeedCard";
import HomePageRecentPost from "./HomePageRecentPost";
import HomePageCreatePost from "./HomePageCreatePost";
import HomePageMyGroups from "./HomePageMyGroups";
import HomePageFollowing from "./HomePageFollowing";
import HomeLeftSidebar from "./HomeLeftSidebar";
import { IRecipe, TGroupMeta } from "@/src/types";
import { queryParams } from "@/src/types";
import useDebounce from "@/src/hooks/debounce.hook";
import { getAllRecipes } from "@/src/services/Recipe";

const HomePageCard = ({
  recipe,
  allGroups,
}: {
  recipe?: IRecipe[];
  allGroups?: TGroupMeta;
}) => {
  const [recipeData, setRecipeData] = useState<IRecipe[]>(recipe!);
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
          <HomePageRecentPost recipes={recipe!} title="Recent Posts" />
        </div>
      </div>

      <div className="md:col-span-2 mt-4 lg:mt-0">
        {/* create new post section */}
        <HomePageCreatePost />

        <div className="flex flex-col justify-center items-center my-2 w-full ">
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("search")}
              aria-label="Search"
              color="default"
              placeholder="Search..."
              size="md"
              startContent={
                <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400 " />
              }
              type="text"
            />
          </form>
          {loading && <Spinner className="my-2" size="sm" />}
        </div>

        <div className=" mb-8">
          <HomePageFeedCard recipe={recipeData} />
          {/* <HomePageFeedCard /> */}
        </div>
      </div>

      <div className="hidden md:flex md:col-span-1 mt-4 lg:mt-0 flex-col gap-4">
        {/* my groups */}
        <HomePageMyGroups allGroups={allGroups!} />

        {/* following */}
        <HomePageFollowing />
      </div>
    </div>
  );
};

export default HomePageCard;
