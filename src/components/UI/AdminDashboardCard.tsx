"use client";
import RecipeDisplayCard from "@/src/components/UI/RecipeDisplayCard";
import { useUser } from "@/src/context/user.provider";
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
import { getAllRecipes } from "@/src/services/Recipe";

export type queryParams = {
  name: string;
  value: boolean | React.Key;
};

type TTags = { _id: string; tags: string };

type TRecipeMeta = {
  meta: { page: number; limit: number; total: number; totalPage: number };
  result: IRecipe[];
};

const AdminDashboardCard = ({
  recipe,
  tags,
}: {
  recipe: TRecipeMeta;
  tags: TTags[];
}) => {
  const { user, isLoading } = useUser();
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("-upvote");
  const [currentPage, setCurrentPage] = useState(1);
  const { register, handleSubmit, watch } = useForm();
  const [recipeData, setRecipeData] = useState<[]>([]);
  const [tag, setTag] = useState("");
  const [totalPage, setTotalPage] = useState(1);

  const searchText = useDebounce(watch("search"));

  useEffect(() => {
    // setRecipeData(data?.data?.result);
    if (searchText || tag) {
      setCurrentPage(1);
    }

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

    const fetchData = async () => {
      const { data: allRecipe } = await getAllRecipes(query);
      setRecipeData(allRecipe?.result);
      setTotalPage(allRecipe?.meta?.totalPage);
    };

    if (query.length > 0) {
      fetchData();
    }
  }, [user, currentPage, searchText, tag, sort, totalPage]);

  const onSubmit = (data: FieldValues) => {};

  if (isLoading) {
    <p>Loading...</p>;
  }

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
            onInputChange={(value) => {
              setTag(value);
              setCurrentPage(1);
            }}
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

      <RecipeDisplayCard recipe={recipeData || recipe?.result} />

      <div className="mt-5 flex justify-center items-center">
        {recipe?.result?.length > 0 && (
          <Pagination
            total={totalPage}
            page={currentPage}
            onChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
      {recipe?.result?.length < 1 && <p>No Recipe available!</p>}
    </div>
  );
};

export default AdminDashboardCard;
