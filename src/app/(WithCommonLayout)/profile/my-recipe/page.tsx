"use client";
import RecipeDisplayCard from "@/src/components/UI/RecipeDisplayCard";
import { useUser } from "@/src/context/user.provider";
import {
  useGetAllMyRecipe,
  useGetAllMyTags,
  useGetAllRecipe,
} from "@/src/hooks/recipe.hook";
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

export type queryParams = {
  name: string;
  value: boolean | React.Key;
};

const MyRecipe = () => {
  const { user, isLoading } = useUser();
  const {
    mutate: handleRecipe,
    data,
    isPending,
    isSuccess,
  } = useGetAllMyRecipe(user?.email!);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("-upvote");
  const [currentPage, setCurrentPage] = useState(1);
  const { register, handleSubmit, watch } = useForm();
  const [recipeData, setRecipeData] = useState<[]>([]);
  const [tag, setTag] = useState("");
  const { mutate: handleTags, data: myTags } = useGetAllMyTags(user?.email!);

  const searchText = useDebounce(watch("search"));
  console.log(searchText);

  console.log(data);
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
    if (currentPage) {
      query.push({ name: "page", value: currentPage });
    }
    if (tag) {
      query.push({ name: "tags", value: tag });
    }

    if (user?.email) {
      handleRecipe({ id: user?._id, query });
      handleTags(user?._id);
    }

    if (user?.email && searchText) {
      handleRecipe({ id: user?._id, query });
    }
  }, [user, currentPage, searchText, tag, sort]);

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

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

  console.log(myTags);

  // const sorted = recipeData?.sort((a, b) => b.upvote.length - a.upvote.length);
  // console.log(sorted);

  const sortBy = [
    { name: "Most Upvoted", value: "-upvote" },
    { name: "Less Upvoted", value: "upvote" },
  ];

  console.log(sort);

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
        {myTags && myTags.data.length > 0 && (
          <Autocomplete
            onInputChange={(value) => setTag(value)}
            label="Filter"
            className="w-20"
            size="sm"
          >
            {myTags.data.map((tag: IRecipe) => (
              <AutocompleteItem key={tag._id} value={tag.tags}>
                {tag.tags}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        )}

        {recipeData && recipeData.length > 0 && (
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
        {myTags && myTags.data.length > 0 && (
          <Button className="rounded-lg h-11 bg-default-100" size="sm">
            <RotateCw onClick={() => setTag("")} />
          </Button>
        )}
      </div>

      <RecipeDisplayCard recipe={recipeData} />

      <div className="mt-5 flex justify-center items-center">
        {data?.data?.result?.length > 0 && (
          <Pagination
            total={data?.data?.meta.totalPage}
            initialPage={currentPage}
            onChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
      {data?.data?.result?.length < 1 && <p>No Recipe available!</p>}
    </div>
  );
};

export default MyRecipe;
