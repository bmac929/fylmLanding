import React, { useState, useEffect } from 'react';

const WORDS = ['movies', 'shorts', 'series', 'indie films', 'filmmakers', 'actors', 'merch'];
const TYPING_SPEED = 100;
const DELETING_SPEED = 50;
const WORD_CHANGE_DELAY = 3000;

const TypeWriter = () => {
  const [text, setText] = useState('');
  const [color, setColor] = useState('text-[#fda400]');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(TYPING_SPEED);

  useEffect(() => {
    let timer;
    const currentWord = WORDS[wordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(prev => prev.slice(0, -1));
        setTypingSpeed(DELETING_SPEED);
      }, DELETING_SPEED);

      if (text === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % WORDS.length);
      }
    } else {
      if (text === currentWord) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, WORD_CHANGE_DELAY);
      } else {
        timer = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
          setTypingSpeed(TYPING_SPEED);
        }, TYPING_SPEED);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  return (
    <span
      className={`${color} relative inline-block min-w-[120px] transition-colors duration-300`}
    >
      {text}
      <span className="animate-blink ml-0.5 font-normal opacity-70">|</span>
    </span>
  );
};

export default TypeWriter;