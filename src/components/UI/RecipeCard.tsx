"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import dynamic from "next/dynamic"; // Dynamically import Quill

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
import "react-quill-new/dist/quill.snow.css";
import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import { Button } from "@nextui-org/button";
import { FieldValues } from "react-hook-form";
import FXSelect from "@/src/components/form/FXSelect";
import { useUser } from "@/src/context/user.provider";
import {
  useCreateRecipe,
  useGetSingleRecipe,
  useUpdateRecipe,
} from "@/src/hooks/recipe.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import createRecipeValidationSchema from "@/src/schemas/create-recipe.schema";
import updateRecipeValidationSchema from "@/src/schemas/update-recipe.schema";

const RecipeCard = ({ title, id }: { title: string; id?: string }) => {
  const { user } = useUser();
  const [value, setValue] = useState("");
  const [instructions, setInstructions] = useState(" ");
  const { mutate: handleCreateRecipe, isPending } = useCreateRecipe(
    user?.email!
  );
  const { data: singleRecipeData } = useGetSingleRecipe(id!);
  const [recipeTitle, setRecipeTitle] = useState(singleRecipeData?.data?.title);
  const [tags, setTags] = useState(singleRecipeData?.data?.tags);
  const [instruction, setInstruction] = useState(
    singleRecipeData?.data?.instructions
  );
  const { mutate: handleUpdateRecipe } = useUpdateRecipe(user?.email!);

  console.log(singleRecipeData);

  console.log({ id });

  useEffect(() => {
    if (singleRecipeData?.data) {
      setRecipeTitle(singleRecipeData.data.title);
      setTags(singleRecipeData.data.tags);
      setInstruction(singleRecipeData.data.instructions);
    }
  }, [singleRecipeData]);

  const contentOptions = [
    { key: "free", label: "Free" },
    { key: "premium", label: "Premium" },
  ];

  const base64ToFile = (base64: string, filename: string) => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)![1]; // Extract MIME type
    const bstr = atob(arr[1]); // Decode base64
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const extractImages = (htmlContent: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    const images = tempDiv.querySelectorAll("img");
    const imageSources = Array.from(images).map((img) => img.src);
    return imageSources;
  };

  const removeImagesFromContent = (htmlContent: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;

    const images = tempDiv.querySelectorAll("img");
    images.forEach((img) => img.remove());

    return tempDiv.innerHTML;
  };

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    const imageSources = extractImages(value);
    const instructionsWithoutImages = removeImagesFromContent(value);
    setInstructions(instructionsWithoutImages);
    console.log("Instructions without images:", instructionsWithoutImages);

    const formData = new FormData();
    imageSources.forEach((src, index) => {
      if (src.startsWith("data:image")) {
        // If image is in base64 format, convert it to File
        const file = base64ToFile(src, `image${index}.png`);
        formData.append("file", file);
      }
    });
    const recipeData = {
      ...data,
      image: " ",
      instructions: instructionsWithoutImages,
      user: user?._id,
      contentType: user?.membership === "basic" ? "free" : data.contentType,
    };
    console.log("inside", recipeData);
    formData.append("data", JSON.stringify(recipeData));

    console.log(formData.get("file"));

    handleCreateRecipe(formData);

    if (id) {
      const updatedData = {
        id,
        data: {
          title: recipeTitle,
          tags: tags,
          contentType: data.contentType
            ? data.contentType
            : singleRecipeData?.data?.contentType,
          instructions:
            instructions.length > 0 ? instructionsWithoutImages : instruction,
        },
      };
      setInstructions(
        instructions.length > 0 ? instructionsWithoutImages : instruction
      );
      console.log(updatedData);
      handleUpdateRecipe(updatedData);
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],
    },
  };

  return (
    <div className="flex mt-6 w-full flex-col items-center justify-center mb-12">
      <h3 className="my-2 text-2xl font-bold">{title}</h3>
      <div className="w-[80%]">
        <FXForm
          onSubmit={onSubmit}
          resolver={zodResolver(
            id ? updateRecipeValidationSchema : createRecipeValidationSchema
          )}
        >
          <div className="py-3">
            <FXInput
              name="title"
              label="Title"
              size="sm"
              required={true}
              value={recipeTitle}
              onChange={(e) => setRecipeTitle(e.target.value)}
            />
          </div>
          <div className="py-3">
            <FXInput
              name="tags"
              label="Tags"
              size="sm"
              required={true}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div className="py-3">
            <FXSelect
              options={contentOptions}
              name="contentType"
              label="Content Type"
              size="sm"
              required={true}
            />
          </div>

          <div>
            <ReactQuill
              modules={modules}
              theme="snow"
              value={value || instruction}
              onChange={setValue}
              placeholder="Please type instructions and give an image"
            />
          </div>
          {!instructions && (
            <p className="text-xs text-red-500">Please enter instructions!</p>
          )}
          <Button
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
            size="lg"
            type="submit"
          >
            Submit
          </Button>
        </FXForm>
      </div>
    </div>
  );
};

export default RecipeCard;
