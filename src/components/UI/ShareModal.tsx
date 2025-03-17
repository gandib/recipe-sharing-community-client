"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { TwitterIcon } from "../icons";
import { Facebook, Linkedin } from "lucide-react";

const ShareModal = ({
  id,
  isOpen,
  setIsOpen,
}: {
  id: string;
  isOpen: boolean;
  setIsOpen: any;
}) => {
  const { onOpen, onOpenChange } = useDisclosure();
  return (
    <div>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal size="xs" isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent className="w-full">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Share on Social Media
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-8 items-center justify-center text-primary-500">
                  <div
                    className="cursor-pointer hover:text-secondary-500"
                    onClick={() =>
                      window.open(
                        `https://twitter.com/share?url=${encodeURIComponent(`${window.location.origin}/profile/${id}`)}`,
                        "_blank"
                      )
                    }
                  >
                    <TwitterIcon />
                  </div>
                  <div
                    className="cursor-pointer hover:text-secondary-500"
                    onClick={() =>
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/profile/${id}`)}`,
                        "_blank"
                      )
                    }
                  >
                    <Facebook />
                  </div>
                  <div
                    className="cursor-pointer hover:text-secondary-500"
                    onClick={() =>
                      window.open(
                        `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`${window.location.origin}/profile/${id}`)}&title=${encodeURIComponent("Check out this profile!")}&summary=${encodeURIComponent("This is an amazing profile you should see.")}&source=${encodeURIComponent(window.location.origin)}`,
                        "_blank"
                      )
                    }
                  >
                    <Linkedin />
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
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ShareModal;
