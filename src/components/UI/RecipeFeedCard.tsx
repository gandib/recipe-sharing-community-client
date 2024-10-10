"use client";

import { useUser } from "@/src/context/user.provider";
import { useGetAllMyTags, useGetAllRecipe } from "@/src/hooks/recipe.hook";
import { useEffect, useRef, useState } from "react";
import { Pagination } from "@nextui-org/pagination";
import { FieldValues, useForm } from "react-hook-form";
import useDebounce from "@/src/hooks/debounce.hook";
import { Input } from "@nextui-org/input";
import { RotateCw, SearchIcon } from "lucide-react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { IRecipe } from "@/src/types";
import { Button } from "@nextui-org/button";
import RecipeHomeDisplayCard from "./RecipeHomeDisplayCard";
import Loading from "./Loading";

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
  const [sort, setSort] = useState("-upvote");
  const [currentPage, setCurrentPage] = useState(1);
  const { register, handleSubmit, watch } = useForm();
  const [recipeData, setRecipeData] = useState<IRecipe[]>([]);
  const [tag, setTag] = useState("");
  const { mutate: handleTags, data: myTags } = useGetAllMyTags(user?.email!);
  const [shareUrl, setShareUrl] = useState("");
  const loadingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const fetchRecipes = async () => {
    const query: queryParams[] = [
      { name: "sort", value: sort },
      { name: "page", value: currentPage },
      { name: "limit", value: 9 },
    ];

    if (tag) {
      query.push({ name: "tags", value: tag });
    }

    await handleRecipe(query);
    handleTags(user?._id!);
  };

  useEffect(() => {
    fetchRecipes();
  }, [user, tag, sort, currentPage]);

  useEffect(() => {
    if (isSuccess && data) {
      setRecipeData((prevData) => [...prevData, ...data.data.result]);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isPending) {
        setCurrentPage((prev) => prev + 1);
      }
    });

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [loadingRef, isPending]);

  if (isLoading) {
    return <Loading />;
  }

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
  const sortBy = [
    { name: "Most Upvoted", value: "-upvote" },
    { name: "Less Upvoted", value: "upvote" },
  ];

  console.log(sort, { recipeData });

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

        {recipe && recipe?.result?.length > 0 && (
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
        user={user?._id!}
        recipe={recipeData || recipe?.result}
        shareUrl={shareUrl}
        role={user?.role!}
      />

      <div ref={loadingRef} className="loading-indicator">
        {isPending && <p>Loading more recipes...</p>}
      </div>

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
