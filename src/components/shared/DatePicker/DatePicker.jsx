import DatePicker from "react-date-picker";
import "./DatePicker.css";

export const CustomDatePicker = ({ createdAt, setCreatedAt }) => {
  return (
    <DatePicker
      onChange={setCreatedAt}
      value={createdAt}
      required={true}
      className={["container", "wrapper", createdAt ? "" : "error"]}
    />
  );
};
