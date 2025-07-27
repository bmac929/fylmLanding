// Full pool of quiz questions
export const QUESTIONS = [
  // Original questions (1-10)
  {
    question: "You're stuck on a deserted island and hear a noise in the forest. What do you do?",
    answers: [
      { text: "Investigate immediately - adventure awaits!", genres: { action: 3, thriller: 2, horror: 1 } },
      { text: "Document everything in your survival diary", genres: { drama: 3, documentary: 2, indie: 1 } },
      { text: "Make jokes about your terrible luck", genres: { comedy: 3, drama: 2, indie: 1 } },
      { text: "Hide and observe from a safe distance", genres: { horror: 3, thriller: 2, mystery: 1 } },
      { text: "Try to communicate with whatever made the noise", genres: { scifi: 3, fantasy: 2, drama: 1 } }
    ]
  },
  {
    question: "Your best friend reveals they've been living a double life. Your first thought is...",
    answers: [
      { text: "This would make an amazing story!", genres: { drama: 3, thriller: 2, mystery: 1 } },
      { text: "I need to help them resolve this", genres: { drama: 3, indie: 2, romance: 1 } },
      { text: "What an exciting plot twist!", genres: { action: 3, thriller: 2, comedy: 1 } },
      { text: "I should have seen the signs", genres: { mystery: 3, thriller: 2, horror: 1 } },
      { text: "How cinematically dramatic!", genres: { drama: 3, indie: 2, comedy: 1 } }
    ]
  },
  {
    question: "You find a mysterious package on your doorstep. Inside is...",
    answers: [
      { text: "A map to an ancient treasure", genres: { action: 3, adventure: 2, fantasy: 1 } },
      { text: "Love letters from the past", genres: { romance: 3, drama: 2, indie: 1 } },
      { text: "A device from the future", genres: { scifi: 3, thriller: 2, mystery: 1 } },
      { text: "A cursed family heirloom", genres: { horror: 3, mystery: 2, drama: 1 } },
      { text: "An absurd collection of random items", genres: { comedy: 3, indie: 2, drama: 1 } }
    ]
  },
  {
    question: "Your dream job offer comes with a strange condition. You must...",
    answers: [
      { text: "Complete an impossible mission", genres: { action: 3, thriller: 2, adventure: 1 } },
      { text: "Solve a series of cryptic puzzles", genres: { mystery: 3, thriller: 2, scifi: 1 } },
      { text: "Live without modern technology", genres: { drama: 3, indie: 2, comedy: 1 } },
      { text: "Face your deepest fears", genres: { horror: 3, thriller: 2, drama: 1 } },
      { text: "Pretend to be someone else", genres: { comedy: 3, drama: 2, romance: 1 } }
    ]
  },
  {
    question: "You can travel anywhere in time for 24 hours. You choose...",
    answers: [
      { text: "A pivotal historical moment", genres: { drama: 3, documentary: 2, action: 1 } },
      { text: "The distant future", genres: { scifi: 3, adventure: 2, action: 1 } },
      { text: "Your own past to fix a mistake", genres: { drama: 3, romance: 2, indie: 1 } },
      { text: "A legendary mythical era", genres: { fantasy: 3, adventure: 2, action: 1 } },
      { text: "Yesterday, just to mess with people", genres: { comedy: 3, indie: 2, drama: 1 } }
    ]
  },
  {
    question: "Your city is experiencing an unexplainable phenomenon. You...",
    answers: [
      { text: "Lead a group investigating the truth", genres: { mystery: 3, thriller: 2, scifi: 1 } },
      { text: "Document everything on social media", genres: { documentary: 3, comedy: 2, drama: 1 } },
      { text: "Try to profit from the chaos", genres: { comedy: 3, action: 2, drama: 1 } },
      { text: "Protect your loved ones at all costs", genres: { drama: 3, action: 2, thriller: 1 } },
      { text: "Study it for scientific purposes", genres: { scifi: 3, mystery: 2, documentary: 1 } }
    ]
  },
  {
    question: "You discover you have a unique superpower. Your first act is to...",
    answers: [
      { text: "Fight crime in secret", genres: { action: 3, thriller: 2, drama: 1 } },
      { text: "Help others anonymously", genres: { drama: 3, indie: 2, romance: 1 } },
      { text: "Create viral social media content", genres: { comedy: 3, indie: 2, documentary: 1 } },
      { text: "Investigate its dark origins", genres: { mystery: 3, horror: 2, scifi: 1 } },
      { text: "Start a revolution", genres: { scifi: 3, action: 2, drama: 1 } }
    ]
  },
  {
    question: "Your recurring dream finally makes sense when...",
    answers: [
      { text: "It predicts a future event", genres: { scifi: 3, thriller: 2, mystery: 1 } },
      { text: "It reveals a forgotten memory", genres: { drama: 3, mystery: 2, indie: 1 } },
      { text: "It's actually a parallel universe", genres: { fantasy: 3, scifi: 2, adventure: 1 } },
      { text: "It's connected to an ancient curse", genres: { horror: 3, mystery: 2, fantasy: 1 } },
      { text: "It's just your brain being weird", genres: { comedy: 3, indie: 2, drama: 1 } }
    ]
  },
  {
    question: "You find out your quiet neighborhood is hiding...",
    answers: [
      { text: "A secret spy network", genres: { thriller: 3, action: 2, mystery: 1 } },
      { text: "A underground art movement", genres: { indie: 3, drama: 2, comedy: 1 } },
      { text: "A portal to another dimension", genres: { scifi: 3, fantasy: 2, horror: 1 } },
      { text: "A decades-old mystery", genres: { mystery: 3, drama: 2, thriller: 1 } },
      { text: "A reality TV show in progress", genres: { comedy: 3, drama: 2, documentary: 1 } }
    ]
  },
  {
    question: "Your life story is being turned into a film. The perfect genre would be...",
    answers: [
      { text: "An epic adventure", genres: { action: 3, adventure: 2, fantasy: 1 } },
      { text: "A heartfelt indie drama", genres: { indie: 3, drama: 2, romance: 1 } },
      { text: "A quirky comedy", genres: { comedy: 3, indie: 2, drama: 1 } },
      { text: "A psychological thriller", genres: { thriller: 3, mystery: 2, horror: 1 } },
      { text: "A sci-fi masterpiece", genres: { scifi: 3, drama: 2, action: 1 } }
    ]
  },
  // New questions (11-40)
  {
    question: "You discover an old camera in your attic. The last photo shows...",
    answers: [
      { text: "A mysterious figure in the shadows", genres: { horror: 3, mystery: 2, thriller: 1 } },
      { text: "A forgotten family celebration", genres: { drama: 3, indie: 2, documentary: 1 } },
      { text: "Something scientifically impossible", genres: { scifi: 3, fantasy: 2, mystery: 1 } },
      { text: "A hilarious coincidence", genres: { comedy: 3, indie: 2, drama: 1 } },
      { text: "An epic moment in history", genres: { documentary: 3, drama: 2, action: 1 } }
    ]
  },
  {
    question: "You're given the chance to direct any type of film. You choose...",
    answers: [
      { text: "A mind-bending psychological journey", genres: { thriller: 3, mystery: 2, drama: 1 } },
      { text: "A heartwarming coming-of-age story", genres: { indie: 3, drama: 2, comedy: 1 } },
      { text: "An epic space opera", genres: { scifi: 3, action: 2, adventure: 1 } },
      { text: "A dark fairy tale", genres: { fantasy: 3, horror: 2, drama: 1 } },
      { text: "A quirky romantic comedy", genres: { comedy: 3, romance: 2, indie: 1 } }
    ]
  },
  {
    question: "During a power outage, you find an old board game. Playing it...",
    answers: [
      { text: "Transports you to another world", genres: { fantasy: 3, adventure: 2, action: 1 } },
      { text: "Reveals dark family secrets", genres: { drama: 3, mystery: 2, horror: 1 } },
      { text: "Creates hilarious chaos", genres: { comedy: 3, adventure: 2, fantasy: 1 } },
      { text: "Triggers supernatural events", genres: { horror: 3, thriller: 2, mystery: 1 } },
      { text: "Connects you with lost loved ones", genres: { drama: 3, romance: 2, fantasy: 1 } }
    ]
  },
  {
    question: "You wake up one day with the ability to read minds. Your first action is...",
    answers: [
      { text: "Solve unsolved crimes", genres: { mystery: 3, thriller: 2, action: 1 } },
      { text: "Help people with their problems", genres: { drama: 3, indie: 2, romance: 1 } },
      { text: "Create a comedy show", genres: { comedy: 3, indie: 2, drama: 1 } },
      { text: "Investigate a conspiracy", genres: { thriller: 3, scifi: 2, mystery: 1 } },
      { text: "Document the experience", genres: { documentary: 3, drama: 2, scifi: 1 } }
    ]
  },
  {
    question: "Your phone starts showing messages from the future. They're about...",
    answers: [
      { text: "An impending disaster", genres: { action: 3, thriller: 2, scifi: 1 } },
      { text: "Your future love life", genres: { romance: 3, drama: 2, comedy: 1 } },
      { text: "Winning lottery numbers", genres: { comedy: 3, drama: 2, thriller: 1 } },
      { text: "A scientific breakthrough", genres: { scifi: 3, drama: 2, documentary: 1 } },
      { text: "A supernatural warning", genres: { horror: 3, mystery: 2, fantasy: 1 } }
    ]
  },
  {
    question: "You're chosen to lead a secret mission. The objective is...",
    answers: [
      { text: "Save the world from aliens", genres: { scifi: 3, action: 2, adventure: 1 } },
      { text: "Protect an ancient artifact", genres: { adventure: 3, fantasy: 2, action: 1 } },
      { text: "Expose a corrupt system", genres: { thriller: 3, drama: 2, documentary: 1 } },
      { text: "Break a family curse", genres: { horror: 3, fantasy: 2, drama: 1 } },
      { text: "Film a mockumentary", genres: { comedy: 3, documentary: 2, indie: 1 } }
    ]
  },
  {
    question: "You discover your neighbor is actually...",
    answers: [
      { text: "A time traveler", genres: { scifi: 3, drama: 2, mystery: 1 } },
      { text: "A famous person in hiding", genres: { comedy: 3, drama: 2, romance: 1 } },
      { text: "A supernatural being", genres: { fantasy: 3, horror: 2, mystery: 1 } },
      { text: "An undercover agent", genres: { thriller: 3, action: 2, drama: 1 } },
      { text: "Making an indie film", genres: { indie: 3, comedy: 2, documentary: 1 } }
    ]
  },
  {
    question: "You find a mysterious door in your basement that leads to...",
    answers: [
      { text: "A parallel universe", genres: { scifi: 3, fantasy: 2, adventure: 1 } },
      { text: "Your own memories", genres: { drama: 3, indie: 2, romance: 1 } },
      { text: "A haunted past", genres: { horror: 3, mystery: 2, thriller: 1 } },
      { text: "A secret government facility", genres: { thriller: 3, action: 2, scifi: 1 } },
      { text: "A bizarre comedy club", genres: { comedy: 3, indie: 2, drama: 1 } }
    ]
  },
  {
    question: "You're given a magic pen that makes everything you write come true. You write...",
    answers: [
      { text: "An epic adventure story", genres: { adventure: 3, fantasy: 2, action: 1 } },
      { text: "A perfect love story", genres: { romance: 3, drama: 2, comedy: 1 } },
      { text: "A thrilling mystery", genres: { mystery: 3, thriller: 2, drama: 1 } },
      { text: "A horror story", genres: { horror: 3, thriller: 2, fantasy: 1 } },
      { text: "A hilarious sitcom", genres: { comedy: 3, indie: 2, drama: 1 } }
    ]
  },
  {
    question: "Your dreams start appearing in other people's sleep. They show...",
    answers: [
      { text: "Future events", genres: { scifi: 3, mystery: 2, thriller: 1 } },
      { text: "Emotional memories", genres: { drama: 3, romance: 2, indie: 1 } },
      { text: "Surreal adventures", genres: { fantasy: 3, adventure: 2, comedy: 1 } },
      { text: "Dark secrets", genres: { horror: 3, thriller: 2, mystery: 1 } },
      { text: "Funny mishaps", genres: { comedy: 3, indie: 2, drama: 1 } }
    ]
  },
  {
    question: "You're tasked with documenting an important event. It turns out to be...",
    answers: [
      { text: "A supernatural occurrence", genres: { horror: 3, documentary: 2, mystery: 1 } },
      { text: "A historical discovery", genres: { documentary: 3, drama: 2, adventure: 1 } },
      { text: "A scientific breakthrough", genres: { scifi: 3, documentary: 2, drama: 1 } },
      { text: "A social movement", genres: { drama: 3, indie: 2, documentary: 1 } },
      { text: "A series of coincidences", genres: { comedy: 3, indie: 2, drama: 1 } }
    ]
  },
  {
    question: "You inherit a mysterious business from a distant relative. It's...",
    answers: [
      { text: "A front for spy operations", genres: { thriller: 3, action: 2, mystery: 1 } },
      { text: "A magical curiosity shop", genres: { fantasy: 3, adventure: 2, mystery: 1 } },
      { text: "A haunted tourist attraction", genres: { horror: 3, comedy: 2, mystery: 1 } },
      { text: "A struggling indie theater", genres: { drama: 3, indie: 2, romance: 1 } },
      { text: "A time travel agency", genres: { scifi: 3, adventure: 2, comedy: 1 } }
    ]
  },
  {
    question: "Your old diary starts writing back to you. The messages are...",
    answers: [
      { text: "Warnings about the future", genres: { thriller: 3, scifi: 2, horror: 1 } },
      { text: "Life-changing advice", genres: { drama: 3, indie: 2, romance: 1 } },
      { text: "Hilarious observations", genres: { comedy: 3, fantasy: 2, drama: 1 } },
      { text: "Clues to a mystery", genres: { mystery: 3, thriller: 2, adventure: 1 } },
      { text: "Stories from parallel lives", genres: { fantasy: 3, scifi: 2, drama: 1 } }
    ]
  },
  {
    question: "You're chosen to test a new virtual reality system. It simulates...",
    answers: [
      { text: "An action-packed mission", genres: { action: 3, scifi: 2, adventure: 1 } },
      { text: "Your perfect life", genres: { drama: 3, romance: 2, comedy: 1 } },
      { text: "A horror scenario", genres: { horror: 3, thriller: 2, scifi: 1 } },
      { text: "Historical events", genres: { documentary: 3, drama: 2, action: 1 } },
      { text: "Absurd situations", genres: { comedy: 3, fantasy: 2, indie: 1 } }
    ]
  },
  {
    question: "Your pet starts behaving strangely one day because...",
    answers: [
      { text: "It's actually an alien", genres: { scifi: 3, comedy: 2, mystery: 1 } },
      { text: "It sees ghosts", genres: { horror: 3, mystery: 2, fantasy: 1 } },
      { text: "It's a secret agent", genres: { comedy: 3, action: 2, adventure: 1 } },
      { text: "It understands human emotions", genres: { drama: 3, indie: 2, romance: 1 } },
      { text: "It's from the future", genres: { scifi: 3, adventure: 2, comedy: 1 } }
    ]
  },
  {
    question: "You find a hidden room in your house containing...",
    answers: [
      { text: "Evidence of a crime", genres: { thriller: 3, mystery: 2, drama: 1 } },
      { text: "A portal to another world", genres: { fantasy: 3, adventure: 2, scifi: 1 } },
      { text: "Family secrets", genres: { drama: 3, indie: 2, mystery: 1 } },
      { text: "Something terrifying", genres: { horror: 3, thriller: 2, mystery: 1 } },
      { text: "Something hilariously unexpected", genres: { comedy: 3, indie: 2, drama: 1 } }
    ]
  },
  {
    question: "You're given the power to change one past event. You choose...",
    answers: [
      { text: "A historical disaster", genres: { action: 3, drama: 2, documentary: 1 } },
      { text: "A personal regret", genres: { drama: 3, romance: 2, indie: 1 } },
      { text: "A scientific discovery", genres: { scifi: 3, documentary: 2, drama: 1 } },
      { text: "A mysterious incident", genres: { mystery: 3, thriller: 2, horror: 1 } },
      { text: "An embarrassing moment", genres: { comedy: 3, drama: 2, indie: 1 } }
    ]
  },
  {
    question: "You receive an invitation to a mysterious event. It turns out to be...",
    answers: [
      { text: "A time travelers' meeting", genres: { scifi: 3, mystery: 2, adventure: 1 } },
      { text: "A supernatural gathering", genres: { horror: 3, fantasy: 2, mystery: 1 } },
      { text: "A secret society initiation", genres: { thriller: 3, drama: 2, mystery: 1 } },
      { text: "A surprise reunion", genres: { drama: 3, comedy: 2, romance: 1 } },
      { text: "An elaborate prank", genres: { comedy: 3, indie: 2, drama: 1 } }
    ]
  },
  {
    question: "You discover you're living in a simulation. Your reaction is to...",
    answers: [
      { text: "Fight the system", genres: { action: 3, scifi: 2, thriller: 1 } },
      { text: "Find true connection", genres: { drama: 3, romance: 2, indie: 1 } },
      { text: "Exploit the glitches", genres: { comedy: 3, scifi: 2, adventure: 1 } },
      { text: "Uncover the truth", genres: { mystery: 3, thriller: 2, scifi: 1 } },
      { text: "Document everything", genres: { documentary: 3, drama: 2, scifi: 1 } }
    ]
  },
  {
    question: "Your new smart home device starts making unusual requests. It wants to...",
    answers: [
      { text: "Protect you from danger", genres: { thriller: 3, scifi: 2, horror: 1 } },
      { text: "Help you find love", genres: { romance: 3, comedy: 2, drama: 1 } },
      { text: "Show you the future", genres: { scifi: 3, drama: 2, mystery: 1 } },
      { text: "Solve a crime", genres: { mystery: 3, thriller: 2, action: 1 } },
      { text: "Create chaos", genres: { comedy: 3, scifi: 2, horror: 1 } }
    ]
  },
  {
    question: "You're asked to write your life story, but with a twist. You choose to...",
    answers: [
      { text: "Make it an action thriller", genres: { action: 3, thriller: 2, adventure: 1 } },
      { text: "Focus on emotional truth", genres: { drama: 3, indie: 2, documentary: 1 } },
      { text: "Add supernatural elements", genres: { fantasy: 3, horror: 2, mystery: 1 } },
      { text: "Turn it into a comedy", genres: { comedy: 3, indie: 2, drama: 1 } },
      { text: "Mix reality with science fiction", genres: { scifi: 3, drama: 2, indie: 1 } }
    ]
  },
  {
    question: "You find a mysterious app on your phone that...",
    answers: [
      { text: "Predicts dangerous events", genres: { thriller: 3, scifi: 2, action: 1 } },
      { text: "Shows alternate life paths", genres: { drama: 3, romance: 2, fantasy: 1 } },
      { text: "Creates random adventures", genres: { comedy: 3, adventure: 2, indie: 1 } },
      { text: "Reveals hidden truths", genres: { mystery: 3, drama: 2, documentary: 1 } },
      { text: "Opens portals to other worlds", genres: { fantasy: 3, scifi: 2, horror: 1 } }
    ]
  },
  {
    question: "Your ordinary day is interrupted when you witness...",
    answers: [
      { text: "A superhero in action", genres: { action: 3, fantasy: 2, adventure: 1 } },
      { text: "A touching moment", genres: { drama: 3, indie: 2, romance: 1 } },
      { text: "Something unexplainable", genres: { mystery: 3, scifi: 2, horror: 1 } },
      { text: "A historical event", genres: { documentary: 3, drama: 2, action: 1 } },
      { text: "A series of funny coincidences", genres: { comedy: 3, indie: 2, drama: 1 } }
    ]
  },
  {
    question: "You're given the ability to see through walls. You discover...",
    answers: [
      { text: "A criminal operation", genres: { thriller: 3, action: 2, mystery: 1 } },
      { text: "People's true emotions", genres: { drama: 3, indie: 2, romance: 1 } },
      { text: "Interdimensional portals", genres: { scifi: 3, fantasy: 2, horror: 1 } },
      { text: "Hilarious secret habits", genres: { comedy: 3, indie: 2, drama: 1 } },
      { text: "Historical artifacts", genres: { adventure: 3, documentary: 2, mystery: 1 } }
    ]
  },
  {
    question: "You wake up with no memories. The first thing you find is...",
    answers: [
      { text: "A weapon and a mission", genres: { action: 3, thriller: 2, mystery: 1 } },
      { text: "A love letter", genres: { romance: 3, drama: 2, indie: 1 } },
      { text: "Advanced technology", genres: { scifi: 3, mystery: 2, thriller: 1 } },
      { text: "A ghost", genres: { horror: 3, fantasy: 2, mystery: 1 } },
      { text: "A comedy club membership", genres: { comedy: 3, indie: 2, drama: 1 } }
    ]
  },
  {
    question: "Your new job requires you to...",
    answers: [
      { text: "Travel through time", genres: { scifi: 3, adventure: 2, action: 1 } },
      { text: "Help people find love", genres: { romance: 3, comedy: 2, drama: 1 } },
      { text: "Investigate paranormal events", genres: { horror: 3, mystery: 2, documentary: 1 } },
      { text: "Expose corruption", genres: { thriller: 3, drama: 2, documentary: 1 } },
      { text: "Create viral content", genres: { comedy: 3, indie: 2, documentary: 1 } }
    ]
  },
  {
    question: "You discover you're actually a character in a...",
    answers: [
      { text: "Video game", genres: { action: 3, scifi: 2, adventure: 1 } },
      { text: "Romance novel", genres: { romance: 3, drama: 2, comedy: 1 } },
      { text: "Horror story", genres: { horror: 3, thriller: 2, mystery: 1 } },
      { text: "Documentary", genres: { documentary: 3, drama: 2, indie: 1 } },
      { text: "Sitcom", genres: { comedy: 3, indie: 2, drama: 1 } }
    ]
  },
  {
    question: "You gain the power to enter paintings. You choose to explore...",
    answers: [
      { text: "A battle scene", genres: { action: 3, adventure: 2, fantasy: 1 } },
      { text: "A portrait's hidden story", genres: { drama: 3, mystery: 2, romance: 1 } },
      { text: "A surreal landscape", genres: { fantasy: 3, scifi: 2, horror: 1 } },
      { text: "A historical moment", genres: { documentary: 3, drama: 2, action: 1 } },
      { text: "An abstract comedy", genres: { comedy: 3, indie: 2, fantasy: 1 } }
    ]
  },
  {
    question: "Your reflection in the mirror starts acting independently. It...",
    answers: [
      { text: "Warns of future dangers", genres: { thriller: 3, horror: 2, scifi: 1 } },
      { text: "Shows your true self", genres: { drama: 3, indie: 2, romance: 1 } },
      { text: "Creates amusing situations", genres: { comedy: 3, fantasy: 2, indie: 1 } },
      { text: "Reveals parallel lives", genres: { scifi: 3, drama: 2, mystery: 1 } },
      { text: "Solves mysteries", genres: { mystery: 3, thriller: 2, horror: 1 } }
    ]
  },
  {
    question: "You're given a chance to remake any film. You choose to...",
    answers: [
      { text: "Update a classic action movie", genres: { action: 3, adventure: 2, thriller: 1 } },
      { text: "Reimagine a love story", genres: { romance: 3, drama: 2, indie: 1 } },
      { text: "Transform horror into comedy", genres: { comedy: 3, horror: 2, indie: 1 } },
      { text: "Add sci-fi to history", genres: { scifi: 3, documentary: 2, drama: 1 } },
      { text: "Mix multiple genres", genres: { indie: 3, fantasy: 2, drama: 1 } }
    ]
  }
];