"use client";

import { useUser } from "@/src/context/user.provider";
import { useDeleteGroupRecipe } from "@/src/hooks/group.hook";
import { useDeleteRecipe } from "@/src/hooks/recipe.hook";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

const DeletePostModal = ({
  id,
  isOpen,
  setIsOpen,
  setRevalidateProfile,
  groupId,
}: {
  id: string;
  isOpen: boolean;
  setIsOpen: any;
  setRevalidateProfile?: Dispatch<SetStateAction<boolean>>;
  groupId?: string;
}) => {
  const { user, isLoading } = useUser();
  const {
    mutate: deleteRecipe,
    isPending,
    isSuccess,
  } = useDeleteRecipe(user?.email!);
  const { mutate: deleteGroupRecipe, isPending: isGroupRecipePending } =
    useDeleteGroupRecipe(user?.email!);

  const handleDelete = async () => {
    try {
      if (!groupId) {
        await deleteRecipe(id);
      }
      if (groupId) {
        const deletedData = {
          groupId,
          recipeId: id,
        };
        await deleteGroupRecipe(deletedData);
      }
      setRevalidateProfile?.((prev) => !prev);
      setIsOpen(false);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  const { onOpen, onOpenChange } = useDisclosure();

  if (isLoading || isPending || isGroupRecipePending) {
    <p>Loading...</p>;
  }
  return (
    <div>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal size="xs" isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent className="w-full">
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader> */}
              <ModalBody>
                <p className="text-red-500 font-bold text-xl p-6">
                  Are you sure to delete?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => setIsOpen(onClose)}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handleDelete();
                    setIsOpen(onClose);
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DeletePostModal;
