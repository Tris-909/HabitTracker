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
import { useState } from "react";
import { useNoteStore } from "state";

export const Note = ({ note }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const updateNotePositionByGoalId = useNoteStore(
    (state) => state.updateNotePositionByGoalId
  );
  const [position, setPosition] = useState({
    x: note.x ? note.x : 0,
    y: note.y ? note.y : 0,
  });
  const [description, setDescription] = useState(
    note?.description ? note?.description : ""
  );

  return (
    <Draggable
      allowAnyClick={true}
      axis="both"
      bounds="parent"
      position={{ x: position.x, y: position.y }}
      onStop={(event, data) => {
        setPosition({ x: data.x, y: data.y });
        // updateNotePositionByGoalId({
        //   goalId: note.parentId,
        //   x: data.x,
        //   y: data.y,
        //   noteId: note.id,
        // });
      }}
    >
      <Box
        w="100px"
        h="100px"
        bg="#f2f2f7"
        cursor={"pointer"}
        border="1px solid #bdbdbd"
        borderRadius="5px"
        onClick={() => onOpen()}
      >
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <Editable
                mt="2rem"
                p="1rem"
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
