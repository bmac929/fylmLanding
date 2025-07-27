import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { QUESTIONS } from '../data/quizQuestions';
import { selectRandomQuestions, calculateResults } from '../utils/quizUtils';
import QuizResults from '../components/QuizResults';

const GenreQuiz = () => {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { genres } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (genres) {
      const genreList = genres.split('-');
      setShowResults(true);
      setResults(genreList.map((genre, index) => ({
        genre: genre.charAt(0).toUpperCase() + genre.slice(1),
        percentage: 100 - (index * 15)
      })));
    } else {
      setSelectedQuestions(selectRandomQuestions(QUESTIONS));
    }
  }, [genres]);

  const handleAnswer = (questionIndex, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
    setError('');
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < selectedQuestions.length) {
      setError('Please answer all questions before submitting!');
      const firstUnanswered = selectedQuestions.findIndex((_, index) => !answers[index]);
      if (firstUnanswered !== -1) {
        document.getElementById(`question-${firstUnanswered}`).scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
      return;
    }

    const results = calculateResults(answers, selectedQuestions);
    setResults(results);
    setShowResults(true);

    // Create the share URL
    const genreString = results.map(r => r.genre.toLowerCase()).join('-');
    const newUrl = `/quiz/results/${genreString}`;
    setShareUrl(window.location.origin + newUrl);
    navigate(newUrl, { replace: true });
  };

  const handleRetake = () => {
    setAnswers({});
    setResults(null);
    setShowResults(false);
    setSelectedQuestions(selectRandomQuestions(QUESTIONS));
    setError('');
    navigate('/quiz');
  };

  if (showResults) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-primary to-dark">
        <div className="container max-w-4xl">
          <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm">
            <QuizResults
              results={results}
              onRetake={handleRetake}
              shareUrl={shareUrl}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-primary to-dark">
      <div className="container max-w-4xl">
        <div className="bg-white/5 p-8 rounded-xl backdrop-blur-sm">
          <h1 className="text-4xl font-bold text-center mb-8">What's Your Film Genre Personality?</h1>
          <p className="text-center text-light/90 mb-12">
            Answer these 10 questions about how you'd react in different situations, 
            and we'll reveal which film genres truly resonate with your personality!
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-8 flex items-center gap-3">
              <AlertCircle className="text-red-500" size={24} />
              <p className="text-red-500">{error}</p>
            </div>
          )}

          <div className="space-y-12">
            {selectedQuestions.map((q, questionIndex) => (
              <div 
                key={questionIndex} 
                id={`question-${questionIndex}`}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold">
                  {questionIndex + 1}. {q.question}
                </h3>
                <div className="space-y-3">
                  {q.answers.map((answer, answerIndex) => (
                    <button
                      key={answerIndex}
                      onClick={() => handleAnswer(questionIndex, answerIndex)}
                      className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                        answers[questionIndex] === answerIndex
                          ? 'bg-secondary text-primary'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      {answer.text}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <button
              onClick={handleSubmit}
              className="w-full btn-primary"
            >
              Get My Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenreQuiz;