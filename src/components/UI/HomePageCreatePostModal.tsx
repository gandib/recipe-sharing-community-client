"use client";
import { Button } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import React, {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import dynamic from "next/dynamic"; // Dynamically import Quill
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
import "react-quill-new/dist/quill.snow.css";
import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import { FieldValues } from "react-hook-form";
import FXSelect from "@/src/components/form/FXSelect";
import { useUser } from "@/src/context/user.provider";
import { useCreateRecipe, useUpdateRecipe } from "@/src/hooks/recipe.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import createRecipeValidationSchema from "@/src/schemas/create-recipe.schema";
import updateRecipeValidationSchema from "@/src/schemas/update-recipe.schema";
import { IRecipe } from "@/src/types";
import {
  useCreateGroupRecipe,
  useUpdateGroupRecipe,
} from "@/src/hooks/group.hook";

const HomePageCreatePostModal = ({
  isOpen,
  setIsOpen,
  title,
  id,
  singleRecipeData,
  setRevalidate,
  setRevalidateProfile,
  groupId,
}: {
  isOpen: boolean;
  setIsOpen: any;
  title: string;
  id?: string;
  singleRecipeData?: IRecipe;
  setRevalidate?: Dispatch<SetStateAction<boolean>>;
  setRevalidateProfile?: Dispatch<SetStateAction<boolean>>;
  groupId?: string;
}) => {
  const { onOpen, onOpenChange } = useDisclosure();
  const { user, isLoading } = useUser();
  const [value, setValue] = useState("");
  const [instructions, setInstructions] = useState(" ");
  const { mutate: handleCreateRecipe, isPending } = useCreateRecipe(
    user?.email!
  );
  const [recipeTitle, setRecipeTitle] = useState(
    singleRecipeData?.title! || ""
  );
  const [tags, setTags] = useState(singleRecipeData?.tags! || "");
  const [instruction, setInstruction] = useState(
    singleRecipeData?.instructions! || ""
  );
  const { mutate: handleUpdateRecipe } = useUpdateRecipe(user?.email!);
  const { mutate: handleUpdateGroupRecipe } = useUpdateGroupRecipe(
    user?.email!
  );
  const { mutate: handleCreateGroupRecipe, isPending: isGroupPending } =
    useCreateGroupRecipe(user?.email!);

  useEffect(() => {
    if (singleRecipeData) {
      setRecipeTitle(singleRecipeData.title);
      setTags(singleRecipeData.tags);
      setInstruction(singleRecipeData.instructions);
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
    const imageSources = extractImages(value);
    const instructionsWithoutImages = removeImagesFromContent(value);
    const finalInstructions =
      value && value.trim() !== "" ? instructionsWithoutImages : instruction;

    setInstructions(finalInstructions);

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

    if (!id) {
      if (!id && !groupId) {
        formData.append("data", JSON.stringify(recipeData));
        handleCreateRecipe(formData);
      }

      if (!id && groupId) {
        const recipeData = {
          ...data,
          image: " ",
          instructions: instructionsWithoutImages,
          user: user?._id,
          contentType: user?.membership === "basic" ? "free" : data.contentType,
        };
        formData.append("data", JSON.stringify(recipeData));

        const groupPost = {
          groupId,
          data: formData,
        };
        handleCreateGroupRecipe(groupPost);
      }

      if (setRevalidate) {
        setRevalidate(true);
      }
      if (setRevalidateProfile) {
        setRevalidateProfile(true);
      }
    }

    if (id && !groupId) {
      const updatedData = {
        id,
        data: {
          title: recipeTitle,
          tags: tags,
          contentType: data.contentType
            ? data.contentType
            : singleRecipeData?.contentType,
          instructions: finalInstructions,
        },
      };
      setInstructions(finalInstructions);

      handleUpdateRecipe(updatedData);

      if (setRevalidate) {
        setRevalidate(true);
      }
      if (setRevalidateProfile) {
        setRevalidateProfile(true);
      }
    }

    if (id && groupId) {
      const updatedData = {
        groupId,
        recipeId: id,
        data: {
          title: recipeTitle,
          tags: tags,
          contentType: data.contentType
            ? data.contentType
            : singleRecipeData?.contentType,
          instructions: finalInstructions,
        },
      };
      handleUpdateGroupRecipe(updatedData);

      if (setRevalidate) {
        setRevalidate(true);
      }
      if (setRevalidateProfile) {
        setRevalidateProfile(true);
      }
    }

    setIsOpen(false);
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

  if (isLoading) {
    <p>Loading...</p>;
  }
  return (
    <div className="w-full">
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal size="3xl" isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent className="w-full p-0 pt-8 md:p-8 rounded-md max-h-[80%] mb-[10%]  overflow-y-auto">
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader> */}
              <ModalBody>
                <div className="flex mt-2 w-full flex-col items-center justify-center mb-2 border py-6">
                  <h3 className="my-2 text-2xl font-bold">{title}</h3>
                  <div className="w-full p-2 md:w-[90%]">
                    <FXForm
                      onSubmit={onSubmit}
                      resolver={zodResolver(
                        id
                          ? updateRecipeValidationSchema
                          : createRecipeValidationSchema
                      )}
                    >
                      <div className="py-1">
                        <div className="py-2 text-base font-semibold">
                          <label htmlFor="Title">Title</label>
                        </div>
                        <FXInput
                          name="title"
                          label="Enter title"
                          size="sm"
                          required={true}
                          value={recipeTitle}
                          onChange={(e) => setRecipeTitle(e.target.value)}
                        />
                      </div>
                      <div className="py-1">
                        <div className="py-2 text-base font-semibold">
                          <label htmlFor="Tags">Tags</label>
                        </div>
                        <FXInput
                          name="tags"
                          label="Tags"
                          size="sm"
                          required={true}
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                        />
                      </div>
                      <div className="py-1">
                        <div className="py-2 text-base font-semibold">
                          <label htmlFor="Content Type">Content Type</label>
                        </div>
                        <FXSelect
                          options={contentOptions}
                          name="contentType"
                          label="Content Type"
                          size="sm"
                          required={true}
                        />
                      </div>

                      <div>
                        <div className="py-2 text-base font-semibold">
                          <label htmlFor="Content Type">
                            Image and Instructions
                          </label>
                        </div>
                        <ReactQuill
                          modules={modules}
                          theme="snow"
                          className="h-36"
                          value={value || instruction}
                          onChange={setValue}
                          placeholder="Please type instructions and give an image"
                        />
                      </div>
                      {!instructions && (
                        <p className="text-xs text-red-500">
                          Please enter instructions!
                        </p>
                      )}
                      <div className="mt-10">
                        <Button
                          className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
                          size="lg"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </div>
                    </FXForm>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => setIsOpen(onClose)}
                >
                  Close
                </Button>
                {/* <Button color="primary" onPress={() => setIsOpen(onClose)}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default HomePageCreatePostModal;
