"use client";
import RecipeDisplayCard from "@/src/components/UI/RecipeDisplayCard";
import { useUser } from "@/src/context/user.provider";
import { useGetAllMyRecipe, useGetAllRecipe } from "@/src/hooks/recipe.hook";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationItem,
  PaginationCursor,
} from "@nextui-org/pagination";

export type queryParams = {
  name: string;
  value: boolean | React.Key;
};

const MyRecipe = () => {
  const { user } = useUser();
  const { mutate: handleRecipe, data } = useGetAllMyRecipe(user?.email!);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("-_id");
  const [searchTerm, setSearchTerm] = useState("");

  console.log(data);
  useEffect(() => {
    const query: queryParams[] = [];
    if (limit) {
      query.push({ name: "limit", value: limit });
    }
    if (sort) {
      query.push({ name: "sort", value: sort });
    }
    if (searchTerm) {
      query.push({ name: "searchTerm", value: searchTerm });
    }

    console.log(
      query.forEach((item) => {
        item.name, item.value;
      })
    );

    if (user?.email) {
      handleRecipe({ id: user?._id, query });
    }
  }, [user]);

  return (
    <div>
      <RecipeDisplayCard recipe={data?.data?.result} />
      <div className="mt-5 flex justify-center items-center">
        <Pagination total={10} initialPage={1} />
      </div>
    </div>
  );
};

export default MyRecipe;
