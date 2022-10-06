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
import { EmojiPicker, TextAreaWithRef } from "components/shared";
import DatePicker from "react-date-picker";
import dayjs from "dayjs";
import "./DatePicker.css";

export const CreateStepForm = ({ goal, onClose }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [createdAt, setCreatedAt] = useState(new Date());
  const ref = useRef(null);
  const user = useStore((state) => state.user);
  const createStep = useStepStore((state) => state.createStep);

  const createHandler = async () => {
    console.log("createdAt", createdAt, dayjs(createdAt).unix());
    if (amount && description && createdAt) {
      createStep({
        amount: amount,
        description: description,
        goal: goal,
        createdAt: dayjs(createdAt).unix(),
        user: user,
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
            placeholder="Adding some words for yourself"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            isInvalid={!description && error}
          />
          <DatePicker
            onChange={setCreatedAt}
            value={createdAt}
            required={true}
            className={["container", "wrapper", createdAt ? "" : "error"]}
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
          Create
        </Button>
      </ModalFooter>
    </>
  );
};
