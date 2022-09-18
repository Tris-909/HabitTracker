import toast from "react-hot-toast";

export const notify = ({ notifyMessage }: { notifyMessage: string }) =>
  toast(notifyMessage, {
    duration: 3000,
    position: "bottom-right",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
