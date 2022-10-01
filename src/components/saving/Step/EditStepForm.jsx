import { useState, useRef } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  ModalBody,
  ModalFooter,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useStepStore } from "state";
import { EmojiPicker, TextAreaWithRef } from "components/shared";

export const EditStepForm = ({ step, goal, onClose }) => {
  const ref = useRef(null);
  const [amount, setAmount] = useState(step.amount);
  const [description, setDescription] = useState(step.description);
  const [error, setError] = useState("");
  const updateStepId = useStepStore((state) => state.updateStepId);

  const createHandler = async () => {
    if (amount && description) {
      await updateStepId({
        stepId: step.id,
        amount,
        description,
        goalId: goal.id,
      });
      resetForm();
      onClose();
    } else {
      setError("All fields are required");
    }
  };

  const resetForm = () => {
    setAmount("0");
    setDescription("");
  };

  return (
    <>
      <ModalBody>
        <FormControl isInvalid={error ? true : false}>
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            value={amount}
            isInvalid={!amount && error}
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
            isInvalid={!description && error}
          />
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
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
          }}
        >
          Edit
        </Button>
      </ModalFooter>
    </>
  );
};
