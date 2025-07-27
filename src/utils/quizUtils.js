// Quiz utility functions
export const selectRandomQuestions = (questions, count = 10) => {
  // Ensure we have at least one question from each major genre
  const majorGenres = ['action', 'comedy', 'drama', 'horror', 'scifi', 'thriller', 'romance'];
  const selectedQuestions = [];
  const usedIndices = new Set();

  // First, select one question for each major genre
  for (const genre of majorGenres) {
    const genreQuestions = questions.filter((q, index) => {
      if (usedIndices.has(index)) return false;
      return q.answers.some(a => 
        Object.entries(a.genres).some(([g, weight]) => g === genre && weight === 3)
      );
    });

    if (genreQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * genreQuestions.length);
      const questionIndex = questions.indexOf(genreQuestions[randomIndex]);
      selectedQuestions.push(questions[questionIndex]);
      usedIndices.add(questionIndex);
    }
  }

  // Fill remaining slots with random questions
  while (selectedQuestions.length < count) {
    const remainingQuestions = questions.filter((_, index) => !usedIndices.has(index));
    if (remainingQuestions.length === 0) break;

    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    const questionIndex = questions.indexOf(remainingQuestions[randomIndex]);
    selectedQuestions.push(questions[questionIndex]);
    usedIndices.add(questionIndex);
  }

  return selectedQuestions;
};

export const calculateResults = (answers, questions) => {
  const scores = {};

  // Initialize scores for all genres
  questions.forEach(question => {
    question.answers.forEach(answer => {
      Object.keys(answer.genres).forEach(genre => {
        if (!scores[genre]) scores[genre] = 0;
      });
    });
  });

  // Calculate scores based on answers
  Object.entries(answers).forEach(([questionIndex, answerIndex]) => {
    const question = questions[questionIndex];
    const answer = question.answers[answerIndex];
    Object.entries(answer.genres).forEach(([genre, points]) => {
      scores[genre] = (scores[genre] || 0) + points;
    });
  });

  // Convert scores to percentages
  const maxPossibleScore = 30; // Maximum points possible for any genre
  const percentages = Object.entries(scores).map(([genre, score]) => ({
    genre,
    percentage: Math.round((score / maxPossibleScore) * 100)
  }));

  // Sort by percentage and get top 3
  return percentages
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3);
};