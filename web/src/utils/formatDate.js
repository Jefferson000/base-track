const formatDate = (dateString) => {
  if (dateString === null) return dateString;
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export { formatDate }