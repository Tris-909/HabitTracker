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
import { SliderPicker } from "react-color";
import { notify, notifyRules } from "components";

export const SharedForm = ({
  onClose,
  actionHandler,
  state,
  existingAmount,
  existingTitle,
  existingDescription,
  existingColor,
  formName = "",
  milestones = [],
  milestoneId = "",
}) => {
  const ref = useRef(null);
  const [amount, setAmount] = useState(existingAmount ? existingAmount : "");
  const [title, setTitle] = useState(existingTitle ? existingTitle : "");
  const [description, setDescription] = useState(
    existingDescription ? existingDescription : ""
  );
  const [color, setColor] = useState(existingColor ? existingColor : "");
  const [error, setError] = useState("");

  const createHandler = async () => {
    if (formName === "Milestones") {
      const exitCreateMileStones = milestones.some((milestone) => {
        return milestone.amount === amount && milestone.id !== milestoneId;
      });

      if (exitCreateMileStones && milestones.length > 0) {
        notify({
          notifyMessage: `Can't ${state.toLowerCase()} milestone with the same amount as existing milestones`,
          notifyRule: notifyRules.ERROR,
        });
        return "";
      }
    }
    if (amount && description && title && color) {
      actionHandler({
        amount: amount,
        description: description,
        title: title,
        color: color,
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

  const handleChangeComplete = (color) => {
    setColor(color.hex);
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
          {formName === "Milestones" && (
            <>
              <Box
                mt="1rem"
                mb="0.5rem"
                display={"flex"}
                justifyContent="start"
                alignItems="start"
              >
                <FormLabel>Color</FormLabel>
                <Box width="3rem" height="1.5rem" ml="0.5rem" bgColor={color} />
              </Box>

              <SliderPicker
                color={color}
                onChangeComplete={handleChangeComplete}
              />
            </>
          )}
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
