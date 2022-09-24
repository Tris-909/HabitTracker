import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  ModalBody,
  ModalFooter,
  Textarea,
} from "@chakra-ui/react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "initialization/firebase";
import { useStore } from "state";

export const CreateStepForm = ({
  goal,
  onClose,
}: {
  goal: any;
  onClose: () => void;
}) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useStore((state) => state.firestore);

  const createStep = async () => {
    addDoc(collection(db, "steps"), {
      amount: amount,
      description: description,
      parentId: goal.id,
      userId: user.id,
      createdBy: user.email,
      createdAt: serverTimestamp(),
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
          <FormLabel mt="1rem">Description</FormLabel>
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
            createStep();
            onClose();
          }}
        >
          Create
        </Button>
      </ModalFooter>
    </>
  );
};
