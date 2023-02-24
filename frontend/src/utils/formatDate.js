export const formatDate = (date, locale) => {
  let formattedDate = date.toLocaleDateString(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  return formattedDate;
};
