const formatDate = (dateString) => {
  if (!dateString) return "";
  const [year, month, day] = String(dateString).trim().split("-");
  return `${day}/${month}/${year}`;
};

export { formatDate };
