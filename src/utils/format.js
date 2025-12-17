export const formatTask = ({ id, title, status, priority, due }) => {
  const statusIcon = status === "done" ? "✅" : "⭕";
  const dueText = due ? `(Due: ${due})` : "";

  const shortId = id.slice(0, 5);

  return `${shortId} | ${statusIcon} ${title} [${priority.toUpperCase()}] ${dueText}`;
};
