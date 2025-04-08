const questions = [
  {
    question: "What's your ideal weekend?",
    options: [
      { text: "Solo hiking", trait: "introvert",  },
      { text: "Big group adventure ", trait: "extrovert" },
      { text: "Chilling with 2-3 friends ", trait: "ambivert" },
      { text: "Volunteering at an event ", trait: "empathetic" }
    ],
    category: "lifestyle"
  },
  {
    question: "How do you spend your free time?",
    options: [
      { text: "Reading alone", trait: "introvert",  },
      { text: "social gatherings ", trait: "extrovert" },
      { text: "Creative projects ", trait: "ambivert" },
      { text: "Organizing things ", trait: "disciplined" }
    ],
    category: "lifestyle"
  },
  {
    question: "Which of these feels most like 'you'?",
    options: [
      { text: "I bring the energy to the room", trait: "extrovert" },
      { text: "I observe quietly but deeply ", trait: "introvert" },
      { text: "I feel a mix of both depending on the day ", trait: "ambivert" },
      { text: "I connect with people's emotions instantly", trait: "empathetic" },
    ],
    category: "Personality Type"
  },
  {
    question: "How do you prefer to make decisions?",
    options: [
      { text: "Using logic and facts", trait: "logical" },
      { text: "Trusting my gut instinct", trait: "intuitive" },
      { text: "Considering everyone's opinion", trait: "empathetic" },
      { text: "Following rules and structure", trait: "disciplined" },
    ],
    category: "Thinking style"
  },
  {
    question: "How do you handle challenges?",
    options: [
      { text: "Break it into small tasks", trait: "disciplined" },
      { text: "Ask for support", trait: "collaborative" },
      { text: "Come up with creative solutions", trait: "creative" },
      { text: "Power through with confidence", trait: "resilient" },
    ],
    category: "Problem Solving"
  },
  {
    question: "How do you handle deadlines?",
    options: [
      { text: "Plan ahead", trait: "disciplined" },
      { text: "Work under pressure", trait: "resilient" },
      { text: "Break into steps", trait: "organized" },
      { text: "Adapt as needed", trait: "flexible" },
    ],
    category: "Work style"
  },
  {
    question: "When facing critisism, you:",
    options: [
      { text: "Take it personally", trait: "sensitive" },
      { text: "Seek clarification", trait: "self-aware" },
      { text: "Analyze Objectively", trait: "rational" },
      { text: "Defenf your position", trait: "assertive" },
    ],
    category: "Emotional response"
  },
  {
    question: "When learning something new,you prefer to:",
    options: [
      { text: "Research deeply", trait: "analytical" },
      { text: "Discuss with others", trait: "social" },
      { text: "Follow Instructions", trait: "structured" },
      { text: "Experiment hands-on", trait: "practical" },
    ],
    category: "Learning style"
  },
  {
    question: "Your approach to problem-solving is:",
    options: [
      { text: "Logical analysis", trait: "logical" },
      { text: "Creative Brainstorming", trait: "reative" },
      { text: "Team Collaboration", trait: "collaborative" },
      { text: "Step-by-step plan", trait: "methodical" },
    ],
    category: "Problem solving"
  },
  {
    question: "How do you handle unexpected changes?",
    options: [
      { text: "Adapt quickly", trait: "adaptive" },
      { text: "Feel stressed", trait: "sensitive" },
      { text: "Make a new plan", trait: "strategic" },
      { text: "See oppurtunities", trait: "optimistic" },
    ],
    category: "Adaptability"
  },
  {
    question: "How do you prepare for a big event?",
    options: [
      { text: "Create a detailed checklist", trait: "organized" },
      { text: "Go with the flow", trait: "spontaneous" },
      { text: "Visualize the outcome", trait: "intuitive" },
      { text: "Talk it through with someone", trait: "communicative" }
    ],
    category: "Planning Style"
  },
  {
    question: "What motivates you the most?",
    options: [
      { text: "Achieving personal goals", trait: "ambitious" },
      { text: "Making a difference", trait: "purpose-driven" },
      { text: "Gaining knowledge", trait: "curious" },
      { text: "Being recognized", trait: "achievement-oriented" }
    ],
    category: "Motivation"
  },
  {
    question: "In group settings, you usually:",
    options: [
      { text: "Lead the discussion", trait: "leader" },
      { text: "Listen and observe", trait: "introvert" },
      { text: "Encourage others", trait: "supportive" },
      { text: "Keep the group on track", trait: "structured" }
    ],
    category: "Social Role"
  },
  {
    question: "When making a tough choice, you tend to:",
    options: [
      { text: "Weigh pros and cons", trait: "rational" },
      { text: "Follow your feelings", trait: "emotional" },
      { text: "Ask for advice", trait: "open-minded" },
      { text: "Trust your gut", trait: "intuitive" }
    ],
    category: "Decision Making"
  },
  {
    question: "How do you approach your daily routine?",
    options: [
      { text: "Stick to a schedule", trait: "disciplined" },
      { text: "Mix things up often", trait: "spontaneous" },
      { text: "Go with how you feel", trait: "flexible" },
      { text: "Balance structure and freedom", trait: "balanced" }
    ],
    category: "Lifestyle"
  },
  {
    question: "How do you respond to new challenges?",
    options: [
      { text: "Jump in with excitement", trait: "enthusiastic" },
      { text: "Pause and plan first", trait: "strategic" },
      { text: "Seek support from others", trait: "collaborative" },
      { text: "Evaluate the risks", trait: "cautious" }
    ],
    category: "Risk Response"
  },
  {
    question: "Your communication style is usually:",
    options: [
      { text: "Direct and clear", trait: "assertive" },
      { text: "Warm and thoughtful", trait: "empathetic" },
      { text: "Brief and to the point", trait: "efficient" },
      { text: "Lively and expressive", trait: "extrovert" }
    ],
    category: "Communication"
  },
  {
    question: "How do you react when plans change suddenly?",
    options: [
      { text: "Go with the flow", trait: "flexible" },
      { text: "Feel unsettled", trait: "sensitive" },
      { text: "Quickly adjust", trait: "resilient" },
      { text: "Try to restore the original plan", trait: "structured" }
    ],
    category: "Adaptability"
  },
  {
    question: "What best describes your ideal work environment?",
    options: [
      { text: "Quiet and independent", trait: "introvert" },
      { text: "Fast-paced and dynamic", trait: "driven" },
      { text: "Collaborative and social", trait: "team-oriented" },
      { text: "Balanced and flexible", trait: "adaptive" }
    ],
    category: "Work Preference"
  },
  {
    question: "How do you approach long-term goals?",
    options: [
      { text: "Break them into smaller tasks", trait: "organized" },
      { text: "Visualize success regularly", trait: "motivated" },
      { text: "Stay flexible with the path", trait: "adaptive" },
      { text: "Seek accountability partners", trait: "collaborative" }
    ],
    category: "Goal Setting"
  }
];
export default questions;