import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Box,
  Input,
  Button,
  ModalBody,
  ModalFooter,
  Textarea,
} from "@chakra-ui/react";
import { useStore, useStepStore } from "state";
import { EmojiPicker } from "components/shared";

export const CreateStepForm = ({ goal, onClose }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const user = useStore((state) => state.user);
  const createStep = useStepStore((state) => state.createStep);

  const createHandler = async () => {
    createStep({
      amount: amount,
      description: description,
      goalId: goal.id,
      user: user,
    });
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
            <EmojiPicker text={description} setText={setDescription} />
          </Box>
          <Textarea
            placeholder="Adding some words for yourself"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
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
          Create
        </Button>
      </ModalFooter>
    </>
  );
};
