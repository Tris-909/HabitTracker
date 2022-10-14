import Draggable from "react-draggable";
import {
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Editable,
  EditableTextarea,
  EditablePreview,
} from "@chakra-ui/react";
import { SharedButton } from "components/shared";
import { useState } from "react";
import { useNoteStore } from "state";
import { FiTrash2 } from "react-icons/fi";

export const Note = ({ note }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const updateNoteByGoalId = useNoteStore((state) => state.updateNoteByGoalId);
  const deleteNoteByGoalId = useNoteStore((state) => state.deleteNoteByGoalId);
  const [position, setPosition] = useState({
    x: note.x ? note.x : 0,
    y: note.y ? note.y : 0,
  });
  const [description, setDescription] = useState(
    note?.description ? note?.description : ""
  );
  const [isDragging, setIsDragging] = useState(false);

  const onCloseHandler = () => {
    updateNoteByGoalId({
      goalId: note.parentId,
      x: position.x,
      y: position.y,
      description: description,
      noteId: note.id,
    });
    onClose();
  };

  return (
    <Draggable
      allowAnyClick={true}
      axis="both"
      bounds="parent"
      position={{ x: position.x, y: position.y }}
      onDrag={(event) => {
        setIsDragging(true);
      }}
      onStop={(event, data) => {
        setTimeout(() => {
          setIsDragging(false);
        }, 100);
        setPosition({ x: data.x, y: data.y });
        updateNoteByGoalId({
          goalId: note.parentId,
          x: data.x,
          y: data.y,
          description: description,
          noteId: note.id,
        });
      }}
    >
      <Box
        w="100px"
        h="100px"
        bg="#f2f2f7"
        cursor={"pointer"}
        border="1px solid #bdbdbd"
        borderRadius="5px"
        overflow="hidden"
        onClick={(event) => {
          if (!isDragging) {
            onOpen();
          }
        }}
      >
        {description}
        <Modal
          isOpen={isOpen}
          onClose={onCloseHandler}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <SharedButton
                onClickHandler={() => {
                  deleteNoteByGoalId({
                    goalId: note.parentId,
                    noteId: note.id,
                  });
                }}
                displayText="Delete"
                icon={<FiTrash2 />}
              />
              <Editable
                mt="2rem"
                p="1rem"
                whiteSpace="pre-line"
                value={description}
                onChange={(nextValue) => setDescription(nextValue)}
              >
                <EditablePreview w="100%" minHeight={"400px"} />
                <EditableTextarea w="100%" minHeight={"400px"} />
              </Editable>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Draggable>
  );
};
