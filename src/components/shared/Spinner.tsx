import React from "react";
import { Spinner } from "@chakra-ui/react";

export const CustomSpinner = () => {
  return (
    <Spinner
      thickness="5px"
      speed="0.65s"
      emptyColor="gray.200"
      color="#212121"
      size="xl"
    />
  );
};
