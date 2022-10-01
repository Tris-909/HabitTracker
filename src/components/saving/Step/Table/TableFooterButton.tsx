import { Tooltip, IconButton } from "@chakra-ui/react";

interface TableFooterButtonProps {
  tooltipMessage: string;
  onClickHandler: () => void;
  isDisabled: boolean;
  ButtonIcon: any;
  ariaLabel: string;
}

export const TableFooterButton = ({
  tooltipMessage,
  onClickHandler,
  isDisabled,
  ButtonIcon,
  ariaLabel,
}: TableFooterButtonProps) => {
  return (
    <Tooltip label={tooltipMessage}>
      <IconButton
        onClick={() => onClickHandler()}
        isDisabled={isDisabled}
        icon={ButtonIcon}
        aria-label={ariaLabel}
        mr="3"
        bg="#212121"
        color="white"
        borderRadius={0}
        _hover={{
          bg: "#363535",
          color: "white",
        }}
      />
    </Tooltip>
  );
};
