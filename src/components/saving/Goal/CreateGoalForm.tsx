import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "initialization/firebase";
import { useStore } from "state";

export const CreateGoalForm = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const user = useStore((state) => state.user);

  const createSavingGoal = async () => {
    addDoc(collection(db, "goals"), {
      title: title,
      goal: +amount,
      current: 0,
      description: description,
      parentId: user.id,
      userId: user.id,
      createdBy: user.email,
      createdAt: serverTimestamp(),
    });

    resetForm();
  };

  const resetForm = () => {
    setAmount("0");
    setTitle("");
    setDescription("");
  };

  return (
    <>
      <ModalBody>
        <FormControl>
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
          <FormLabel mt="1rem">Description</FormLabel>
          <Input
            type="string"
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
            createSavingGoal();
            onClose();
          }}
        >
          Create
        </Button>
      </ModalFooter>
    </>
  );
};
