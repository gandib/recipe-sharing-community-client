"use client";

import { useUser } from "@/src/context/user.provider";
import { useGetAllRecipe } from "@/src/hooks/recipe.hook";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationItem,
  PaginationCursor,
} from "@nextui-org/pagination";
import { FieldValues, useForm } from "react-hook-form";
import useDebounce from "@/src/hooks/debounce.hook";
import { Input } from "@nextui-org/input";
import { RotateCw, SearchIcon } from "lucide-react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { IRecipe } from "@/src/types";
import { Button } from "@nextui-org/button";
import RecipeHomeDisplayCard from "./RecipeHomeDisplayCard";

export type queryParams = {
  name: string;
  value: boolean | React.Key;
};

type TTags = { _id: string; tags: string };

type TRecipeMeta = {
  meta: { page: number; limit: number; total: number; totalPage: number };
  result: IRecipe[];
};

const RecipeFeedCard = ({
  recipe,
  tags,
}: {
  recipe: TRecipeMeta;
  tags: TTags[];
}) => {
  const { user, isLoading } = useUser();
  const {
    mutate: handleRecipe,
    data,
    isPending,
    isSuccess,
  } = useGetAllRecipe();
  const [limit, setLimit] = useState(recipe?.result?.length);
  const [sort, setSort] = useState("-upvote");
  const [currentPage, setCurrentPage] = useState(1);
  const { register, handleSubmit, watch } = useForm();
  const [recipeData, setRecipeData] = useState<[]>([]);
  const [tag, setTag] = useState("");
  const [contentType, setContentType] = useState("free");

  const searchText = useDebounce(watch("search"));

  useEffect(() => {
    setRecipeData(data?.data?.result);

    const query: queryParams[] = [];
    if (limit) {
      query.push({ name: "limit", value: limit });
    }
    if (sort) {
      query.push({ name: "sort", value: sort });
    }
    if (searchText) {
      query.push({ name: "searchTerm", value: searchText });
    }
    if (tag) {
      query.push({ name: "tags", value: tag });
    }
    console.log(query);
    handleRecipe(query);
    // if (user?.email) {
    //   handleTags(user?._id);
    // }
    if (user?.membership === "basic" || !user?.email) {
      query.push({ name: "contentType", value: "free" });
    }

    if (searchText) {
      handleRecipe(query);
    }
  }, [user, searchText, tag, sort]);

  const onSubmit = (data: FieldValues) => {};

  useEffect(() => {
    if (!searchText) {
      setRecipeData(data?.data?.result);
    }

    if (!isPending && isSuccess && data && searchText) {
      setRecipeData(data?.data?.result ?? []);
    }
  }, [isPending, isSuccess, data, searchText]);

  if (isLoading) {
    <p>Loading...</p>;
  }

  // const sorted = recipeData?.sort((a, b) => b.upvote.length - a.upvote.length);

  const sortBy = [
    { name: "Most Upvoted", value: "-upvote" },
    { name: "Less Upvoted", value: "upvote" },
  ];

  return (
    <div>
      <div className="my-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-1">
            <Input
              {...register("search")}
              aria-label="Search"
              classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm",
              }}
              placeholder="Search Recipe..."
              size="lg"
              startContent={
                <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />
              }
              type="text"
            />
          </div>
        </form>
      </div>

      <div className="flex gap-2">
        {tags && tags.length > 0 && (
          <Autocomplete
            onInputChange={(value) => setTag(value)}
            label="Filter"
            className="w-20"
            size="sm"
          >
            {tags.map((tag: TTags) => (
              <AutocompleteItem key={tag._id} value={tag.tags}>
                {tag.tags}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        )}

        {recipe && recipe.result.length > 0 && (
          <Autocomplete
            onInputChange={(value) =>
              setSort(value === "Most Upvoted" ? "-upvote" : "upvote")
            }
            label="Sort"
            className="w-20"
            size="sm"
          >
            {sortBy.map(
              (upvote: { name: string; value: string }, index: number) => (
                <AutocompleteItem key={index} value={upvote.value}>
                  {upvote.name}
                </AutocompleteItem>
              )
            )}
          </Autocomplete>
        )}
        {tags && tags.length > 0 && (
          <Button className="rounded-lg h-11 bg-default-100" size="sm">
            <RotateCw onClick={() => setTag("")} />
          </Button>
        )}
      </div>

      <RecipeHomeDisplayCard
        recipe={recipeData || recipe?.result}
        role={user?.role!}
        user={user?._id}
      />

      {/* <div className="mt-5 flex justify-center items-center">
        {recipe?.result?.length > 0 && (
          <Pagination
            total={recipe?.meta.totalPage}
            initialPage={currentPage}
            onChange={(page) => setCurrentPage(page)}
          />
        )}
      </div> */}
      {recipe?.result?.length < 1 && <p>No Recipe available!</p>}
    </div>
  );
};

export default RecipeFeedCard;
