import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon
} from 'react-share';
import { Link2 } from 'lucide-react';
import { filmRecommendations } from '../data/filmRecommendations';
import { genreImages } from '../data/genreImages';

const QuizResults = ({ results, onRetake, shareUrl }) => {
  const [copied, setCopied] = React.useState(false);
  const progressRefs = useRef([]);

  useEffect(() => {
    // Reset and trigger progress bar animations
    progressRefs.current.forEach(ref => {
      if (ref) {
        ref.style.width = '0%';
      }
    });

    // Trigger animations after a brief delay
    const timer = setTimeout(() => {
      progressRefs.current.forEach((ref, index) => {
        if (ref && results[index]) {
          ref.style.width = `${results[index].percentage}%`;
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [results]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!results || results.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-light/90">Loading results...</p>
      </div>
    );
  }

  const shareText = `I'm a perfect match for ${results[0].genre} (${results[0].percentage}%), ${results[1].genre} (${results[1].percentage}%), and ${results[2].genre} (${results[2].percentage}%)! Find out your film personality at FylmTV! #FylmTV`;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">Your Film Genre Personality</h1>
      
      <div className="space-y-8">
        {results.map((result, index) => {
          const genreKey = result.genre.toLowerCase();
          const recommendations = filmRecommendations[genreKey] || [];
          const genreImage = genreImages[genreKey];

          return (
            <div
              key={index}
              className="transform transition-all duration-500"
              style={{
                animation: `fadeIn 0.5s ease-out ${index * 0.3}s forwards`,
                opacity: 0
              }}
            >
              <div className="bg-white/10 p-6 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  {genreImage && (
                    <img
                      src={genreImage}
                      alt={result.genre}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold">{result.genre}</h3>
                      <span className="text-2xl font-bold text-secondary">{result.percentage}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        ref={el => progressRefs.current[index] = el}
                        className="bg-secondary rounded-full h-2 transition-all duration-2000"
                        style={{ width: '0%' }}
                      />
                    </div>
                  </div>
                </div>
                
                {recommendations.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-light/90 mb-2">Recommended Films:</h4>
                    <ul className="list-disc list-inside space-y-1 text-light/70">
                      {recommendations.map((film, filmIndex) => (
                        <li key={filmIndex}>{film}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Share Your Results</h3>
          <div className="flex justify-center space-x-4">
            <FacebookShareButton url={shareUrl} quote={shareText}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={shareText}>
              <TwitterIcon size={40} round />
            </TwitterShareButton>
            <LinkedinShareButton 
              url={shareUrl} 
              title="My Film Genre Personality" 
              summary={shareText}
            >
              <LinkedinIcon size={40} round />
            </LinkedinShareButton>
            <button
              onClick={handleCopyLink}
              className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors focus:outline-none"
              title="Copy link"
            >
              <Link2 size={24} />
            </button>
          </div>
          {copied && (
            <p className="text-secondary text-sm mt-2">Link copied to clipboard!</p>
          )}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={onRetake}
            className="btn-secondary"
          >
            Take Quiz Again
          </button>
          <Link to="/" className="btn-primary">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;