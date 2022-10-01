import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  ModalBody,
  ModalFooter,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useStore, useGoalStore } from "state";

export const CreateGoalForm = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const user = useStore((state) => state.user);
  const createGoal = useGoalStore((state) => state.createGoal);

  const createSavingGoal = async () => {
    if (title && amount && description) {
      createGoal({
        user: user,
        title: title,
        amount: +amount,
        description: description,
      });
      onClose();
      resetForm();
    } else {
      setError("All fields are required");
    }
  };

  const resetForm = () => {
    setAmount("0");
    setTitle("");
    setDescription("");
  };

  return (
    <>
      <ModalBody>
        <FormControl isInvalid={error ? true : false}>
          <FormLabel>Title</FormLabel>
          <Input
            type="string"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
          <FormLabel>Description</FormLabel>
          <Input
            type="string"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
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
            createSavingGoal();
          }}
        >
          Create
        </Button>
      </ModalFooter>
    </>
  );
};
