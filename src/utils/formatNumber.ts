export const formatNumber = (number: string) => {
  if (!number) {
    return "";
  }
  return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const deFormatNumber = (number: string) => {
  if (!number) {
    return "";
  }
  return number.replace(",", "");
};
