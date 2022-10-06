import { useState, useRef } from "react";
import {
  FormControl,
  FormLabel,
  Box,
  Input,
  Button,
  ModalBody,
  ModalFooter,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useStore, useStepStore } from "state";
import {
  EmojiPicker,
  TextAreaWithRef,
  CustomDatePicker,
} from "components/shared";
import dayjs from "dayjs";

export const CreateStepForm = ({ goal, onClose, step = {}, isCreate }) => {
  const [amount, setAmount] = useState(step.amount ? step.amount : "");
  const [description, setDescription] = useState(
    step.description ? step.description : ""
  );
  const [createdAt, setCreatedAt] = useState(
    step.createdAt ? new Date(step.createdAt * 1000) : new Date()
  );
  const [error, setError] = useState("");
  const ref = useRef(null);
  const user = useStore((state) => state.user);
  const createStep = useStepStore((state) => state.createStep);
  const updateStepId = useStepStore((state) => state.updateStepId);

  const createHandler = async () => {
    if (amount && description && createdAt) {
      if (isCreate) {
        createStep({
          amount: amount,
          description: description,
          goal: goal,
          createdAt: dayjs(createdAt).unix(),
          user: user,
        });
      } else {
        await updateStepId({
          stepId: step.id,
          amount,
          description,
          goal: goal,
          createdAt: dayjs(createdAt).unix(),
        });
      }

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
            placeholder="Adding some words for yourself"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            isInvalid={!description && error}
          />
          <CustomDatePicker setCreatedAt={setCreatedAt} createdAt={createdAt} />
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
          onClick={() => {
            createHandler();
          }}
        >
          {isCreate ? "Create" : "Edit"}
        </Button>
      </ModalFooter>
    </>
  );
};
