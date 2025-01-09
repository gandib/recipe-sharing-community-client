"use client";

import { useUser } from "@/src/context/user.provider";
import { useDeleteRecipe } from "@/src/hooks/recipe.hook";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

const DeletePostModal = ({
  id,
  isOpen,
  setIsOpen,
}: {
  id: string;
  isOpen: boolean;
  setIsOpen: any;
}) => {
  const { user, isLoading } = useUser();
  const {
    mutate: deleteRecipe,
    isPending,
    isSuccess,
  } = useDeleteRecipe(user?.email!);
  const handleDelete = () => {
    deleteRecipe(id);
  };
  const { onOpen, onOpenChange } = useDisclosure();

  if (isLoading || isPending) {
    <p>Loading...</p>;
  }
  return (
    <div>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal size="xs" isOpen={isOpen} onOpenChange={onOpenChange}>
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
