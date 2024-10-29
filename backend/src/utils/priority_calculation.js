export const priorityCalculation = (description, title, createdAt) => {
  let priority = 0;

  // Weights for each factor
  const weights = {
    descriptionLength: 0.3,
    titleLength: 0.2,
    keywordPresence: 0.3,
    creationDate: 0.2,
  };

  // Description Length Scoring
  let descriptionScore = 0;
  if (description.length < 10) {
    descriptionScore = 1;
  } else if (description.length >= 10 && description.length <= 20) {
    descriptionScore = 2;
  } else if (description.length > 20) {
    descriptionScore = 3;
  }
  priority += descriptionScore * weights.descriptionLength;

  // Title Length Scoring
  let titleScore = 0;
  if (title.length < 5) {
    titleScore = 0.5;
  } else if (title.length >= 5 && title.length <= 15) {
    titleScore = 1;
  } else if (title.length > 15) {
    titleScore = 1.5;
  }
  priority += titleScore * weights.titleLength;

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
  priority += keywordScore * weights.keywordPresence;

  // Creation Date Scoring
  let creationScore = 0;
  if (createdAt) {
    const timeSinceCreation =
      (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60); // hours since creation
    if (timeSinceCreation <= 24) {
      creationScore = 1;
    }
  } else {
    // means it was created now
    creationScore = 1;
  }
  priority += creationScore * weights.creationDate;

  // Normalizing the priority score to be between 0 and 1
  const maxScore =
    3 * weights.descriptionLength +
    1.5 * weights.titleLength +
    2 * weights.keywordPresence +
    1 * weights.creationDate;
  priority = Math.min(1, Math.max(0, priority / maxScore));
  priority = Math.round(priority * 100) / 100; // Rounding to 2 decimal places

  return priority;
};

