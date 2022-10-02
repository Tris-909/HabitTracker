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

export const CreateGoalForm = ({
  goal,
  state,
  onClose,
}: {
  goal?: any;
  state: string;
  onClose: () => void;
}) => {
  const [title, setTitle] = useState(goal?.title);
  const [amount, setAmount] = useState(goal?.goal);
  const [description, setDescription] = useState(goal?.description);
  const [error, setError] = useState("");
  const user = useStore((state) => state.user);
  const createGoal = useGoalStore((state) => state.createGoal);
  const editGoal = useGoalStore((state) => state.editGoal);

  const onSubmitHandler = async () => {
    if (title && amount && description) {
      if (state === "Create") {
        createGoal({
          user: user,
          title: title,
          amount: +amount,
          description: description,
        });
      } else {
        editGoal({
          goalId: goal?.id,
          title: title,
          amount: +amount,
          description: description,
        });
      }

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
            isInvalid={!title && error.length !== 0}
            onChange={(event) => setTitle(event.target.value)}
          />
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            value={amount}
            isInvalid={!amount && error.length !== 0}
            onChange={(event) => setAmount(event.target.value)}
          />
          <FormLabel>Description</FormLabel>
          <Input
            type="string"
            value={description}
            isInvalid={!description && error.length !== 0}
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
            onSubmitHandler();
          }}
        >
          Create
        </Button>
      </ModalFooter>
    </>
  );
};
