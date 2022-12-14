import {
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
} from "@chakra-ui/react";
import { FiSmile } from "react-icons/fi";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export const EmojiPicker = ({ text, setText, cursor }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          bg="white"
          border="1px solid #e8e3e3"
          aria-label="Happy Face"
          icon={<FiSmile />}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <Picker
          data={data}
          theme="light"
          onEmojiSelect={(emojiObject) => {
            const { selectionStart, selectionEnd } = cursor.current;
            const newTextWithEmoji =
              text.slice(0, selectionStart) +
              emojiObject.native +
              text.slice(selectionEnd);

            setText(newTextWithEmoji);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
