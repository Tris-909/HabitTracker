import { Textarea, forwardRef } from "@chakra-ui/react";

export const TextAreaWithRef = forwardRef((props, ref) => {
  return <Textarea ref={ref} {...props} />;
});
