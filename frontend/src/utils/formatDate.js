export const formatDate = (date) => {
  let formattedDate = date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  return formattedDate;
};
