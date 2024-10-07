"use client";
import RecipeDisplayCard from "@/src/components/UI/RecipeDisplayCard";
import { useUser } from "@/src/context/user.provider";
import { useGetAllRecipe } from "@/src/hooks/recipe.hook";
import { useEffect, useState } from "react";

export type queryParams = {
  name: string;
  value: boolean | React.Key;
};

const AllRecipe = () => {
  const { user } = useUser();
  const { mutate: handleRecipe, data } = useGetAllRecipe(user?.email!);
  const [limit, setLimit] = useState(3);
  const [sort, setSort] = useState("-_id");
  const [searchTerm, setSearchTerm] = useState("");
  const [contentType, setContentType] = useState("");
  const [tags, setTags] = useState("");

  console.log(data);
  useEffect(() => {
    if (user?.membership === "basic") {
      setContentType("free");
      console.log(contentType);
    }
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
    if (contentType) {
      query.push({ name: "contentType", value: contentType });
    }
    if (tags) {
      query.push({ name: "tags", value: tags });
    }

    console.log(
      query.forEach((item) => {
        item.name, item.value;
      })
    );

    if (user?.email) {
      handleRecipe(query);
    }
  }, [user]);

  return (
    <div>
      <RecipeDisplayCard recipe={data?.data?.result} />
    </div>
  );
};

export default AllRecipe;
