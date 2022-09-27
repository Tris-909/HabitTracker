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
import { useStepStore } from "state";

export const EditStepForm = ({
  step,
  onClose,
}: {
  step: any;
  onClose: () => void;
}) => {
  console.log("step", step);
  const [amount, setAmount] = useState(step.amount);
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
          <FormLabel mt="1rem">Description</FormLabel>
          <Textarea
            placeholder="Edit description for step"
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
          Edit
        </Button>
      </ModalFooter>
    </>
  );
};
