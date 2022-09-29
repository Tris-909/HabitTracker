import toast from "react-hot-toast";
export * from "./toastOptions";

export const notify = ({
  notifyMessage,
  notifyRule,
}: {
  notifyMessage: string;
  notifyRule: any;
}) => toast(notifyMessage, notifyRule);
