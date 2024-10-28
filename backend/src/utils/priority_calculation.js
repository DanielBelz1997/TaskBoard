export const priorityCalculation = (description, title) => {
  let priority = 0;

  // Description Length Scoring
  let descriptionScore = 0;
  if (description.length < 10) {
    descriptionScore += 1;
  } else if (description.length > 10 && description.length < 20) {
    descriptionScore += 2;
  } else if (description.length > 20) {
    descriptionScore += 3;
  }

  priority += descriptionScore * 0.3;

  // Title Length Scoring
  let titleScore = 0;
  if (title.length < 5) {
    titleScore += 0.5;
  } else if (title.length > 5 && title.length < 15) {
    titleScore += 1;
  } else if (title.length > 15) {
    titleScore += 1.5;
  }
  priority += titleScore * 0.4;

  // Keyword Presence Scoring
  let keywordScore = 0;
  if (description.includes("urgent") || title.includes("urgent")) {
    keywordScore = 2;
  } else if (description.includes("important") || title.includes("important")) {
    keywordScore = 1.5;
  } else if (
    description.includes("low-priority") ||
    title.includes("low-priority")
  ) {
    keywordScore = -1;
  }
  priority += keywordScore * 0.3;

  priority = Math.round(priority * 100) / 100;

  return priority;
};
