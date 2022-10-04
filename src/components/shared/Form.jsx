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
import { EmojiPicker, TextAreaWithRef } from "components/shared";

export const SharedForm = ({
  onClose,
  actionHandler,
  state,
  existingAmount,
  existingTitle,
  existingDescription,
}) => {
  const ref = useRef(null);
  const [amount, setAmount] = useState(existingAmount ? existingAmount : "");
  const [title, setTitle] = useState(existingTitle ? existingTitle : "");
  const [description, setDescription] = useState(
    existingDescription ? existingDescription : ""
  );
  const [error, setError] = useState("");

  const createHandler = async () => {
    if (amount && description && title) {
      actionHandler({
        amount: amount,
        description: description,
        title: title,
      });
      resetForm();
      onClose();
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
            isInvalid={!title && error}
            onChange={(event) => setTitle(event.target.value)}
          />
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
              isInvalid={!description && error}
              setText={setDescription}
              cursor={ref}
            />
          </Box>
          <TextAreaWithRef
            ref={ref}
            placeholder="Adding some words for yourself"
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
          onClick={() => {
            createHandler();
          }}
        >
          {state === "Create" ? "Create" : "Edit"}
        </Button>
      </ModalFooter>
    </>
  );
};
