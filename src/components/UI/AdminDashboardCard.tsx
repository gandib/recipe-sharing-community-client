"use client";

import { useUser } from "@/src/context/user.provider";
import { useEffect, useState } from "react";
import {
  Pagination,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Card,
  CardHeader,
} from "@nextui-org/react";
import { FieldValues, useForm } from "react-hook-form";
import useDebounce from "@/src/hooks/debounce.hook";
import { IRecipe, queryParams, TRecipeMeta, TTags } from "@/src/types";
import { getAllRecipes } from "@/src/services/Recipe";
import { useGetAllUser } from "@/src/hooks/user.hook";
import PieCharts from "./PieChart";
import LineChartComponent from "./LineChart";
import Image from "next/image";

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
  const [loading, setLoading] = useState(false);
  const { data } = useGetAllUser("");

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
  }, [user, currentPage, searchText, tag, sort, totalPage, loading]);

  const onSubmit = (data: FieldValues) => {};

  if (isLoading) {
    <p>Loading...</p>;
  }

  const sortBy = [
    { name: "Most Upvoted", value: "-upvote" },
    { name: "Less Upvoted", value: "upvote" },
  ];

  type RecipeStatus = "published" | "unpublished";
  type ContentType = "free" | "premium";

  const statusColorMap: Record<RecipeStatus, any> = {
    published: "success",
    unpublished: "danger",
  };
  const contentTypeColorMap: Record<ContentType, any> = {
    free: "success",
    premium: "danger",
  };

  return (
    <div className="mb-10">
      <h1 className="text-xl font-bold my-4">Latest Recipe</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 mb-6 gap-2 lg:gap-16 justify-around">
        {recipeData?.slice(0, 2)?.map((recipe: IRecipe) => (
          <Card key={recipe._id} className="rounded-none">
            <CardHeader>
              <div className=" flex gap-2">
                <Image
                  width={100}
                  height={100}
                  src={recipe.image[0]}
                  alt="recipe"
                  className="w-24 h-24"
                />
                <div>
                  <h1 className="text-secondary-500">{recipe.title}</h1>
                  <h3 className="text-lg font-semibold">{recipe.user.name}</h3>
                  <div
                    className="text-sm"
                    dangerouslySetInnerHTML={{
                      __html:
                        recipe?.instructions.slice(0, 100) +
                        `${recipe.instructions.length > 100 ? "..." : ""}`,
                    }}
                  ></div>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 md:gap-4">
        <div>
          <PieCharts data={recipe} />
          <p className="text-xl font-semibold">Recipe with likes</p>
        </div>
        <div>
          <LineChartComponent data={data} />
          <p className="text-xl font-semibold">User with followers</p>
        </div>
      </div>

      <div>
        <h1 className="text-xl font-bold mt-8 mb-4 w-full">All Recipes</h1>
        <Table
          isStriped
          aria-label="Example static collection table"
          bottomContent={
            recipeData?.length > 0 ? (
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="primary"
                  page={currentPage}
                  total={totalPage}
                  onChange={(page) => setCurrentPage(page)}
                />
              </div>
            ) : null
          }
        >
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Author Name</TableColumn>
            <TableColumn>Content Type</TableColumn>
            <TableColumn>Like</TableColumn>
            <TableColumn>Dislike</TableColumn>
            <TableColumn>Status</TableColumn>
            {/* <TableColumn>ACTION</TableColumn> */}
          </TableHeader>
          <TableBody>
            {recipeData?.map((recipe: IRecipe) => (
              <TableRow key={recipe._id}>
                <TableCell>{recipe.title}</TableCell>
                <TableCell>{recipe.user.name}</TableCell>
                <TableCell>
                  <Chip
                    className="capitalize border-none gap-1 text-default-600"
                    color={
                      contentTypeColorMap[recipe?.contentType as ContentType]
                    }
                    size="sm"
                    variant="dot"
                  >
                    {recipe?.contentType}
                  </Chip>
                </TableCell>
                <TableCell>{recipe.upvote.length}</TableCell>
                <TableCell>{recipe.downvote.length}</TableCell>
                <TableCell>
                  <Chip
                    className="capitalize border-none gap-1 text-default-600"
                    color={statusColorMap[recipe?.status as RecipeStatus]}
                    size="sm"
                    variant="dot"
                  >
                    {recipe?.status}
                  </Chip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminDashboardCard;
