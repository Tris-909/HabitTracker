import { useState, useRef } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useStepStore } from "state";
import { EmojiPicker, TextAreaWithRef } from "components/shared";

export const EditStepForm = ({ step, onClose }) => {
  const [amount, setAmount] = useState(step.amount);
  const ref = useRef(null);
  const [description, setDescription] = useState(step.description);
  const updateStepId = useStepStore((state) => state.updateStepId);

  const createHandler = async () => {
    await updateStepId({ stepId: step.id, amount, description });
    resetForm();
  };

  const resetForm = () => {
    setAmount("0");
    setDescription("");
  };

  return (
    <>
      <ModalBody>
        <FormControl>
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
          <Box
            display={"flex"}
            justifyContent="space-between"
            alignItems={"center"}
          >
            <FormLabel mt="1rem">Description</FormLabel>
            <EmojiPicker
              text={description}
              setText={setDescription}
              cursor={ref}
            />
          </Box>
          <TextAreaWithRef
            ref={ref}
            placeholder="Edit description for step"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button
          bg="black"
          color="white"
          _hover={{
            bg: "#484848",
          }}
          mr={3}
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          bg="black"
          color="white"
          _hover={{
            bg: "#484848",
          }}
          onClick={() => {
            createHandler();
            onClose();
          }}
        >
          Edit
        </Button>
      </ModalFooter>
    </>
  );
};
