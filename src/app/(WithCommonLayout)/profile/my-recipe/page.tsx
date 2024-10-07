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
  const [limit, setLimit] = useState(1);
  const [sort, setSort] = useState("-_id");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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
    if (currentPage) {
      query.push({ name: "page", value: currentPage });
    }

    console.log(
      query.forEach((item) => {
        item.name, item.value;
      })
    );

    if (user?.email) {
      handleRecipe({ id: user?._id, query });
    }
  }, [user, currentPage]);

  return (
    <div>
      <RecipeDisplayCard recipe={data?.data?.result} />
      <div className="mt-5 flex justify-center items-center">
        {data?.data?.result?.length > 0 && (
          <Pagination
            total={data?.data?.meta.totalPage}
            initialPage={currentPage}
            onChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
      <p>No Recipe available!</p>
    </div>
  );
};

export default MyRecipe;
