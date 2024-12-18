const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-In", {
    weekday: "short", // e.g., "Mon"
    month: "short", // e.g., "Nov"
    day: "2-digit", // e.g., "11"
    year: "numeric", // e.g., "2024"
    hour: "2-digit", // e.g., "03 PM"
    minute: "2-digit", // e.g., "51"
  });
};

const formatNumber = (number) => {
  return number.toLocaleString("en-IN");
};

export default { formatDate, formatNumber };
