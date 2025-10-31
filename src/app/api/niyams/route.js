// Sample API route for fetching niyams
// In a real application, this would connect to your database

const niyams = [
  {
    id: 1,
    text: "Practice gratitude daily - find three things to be thankful for each morning",
    category: "Mindfulness",
    author: "Ancient Wisdom"
  },
  {
    id: 2,
    text: "Speak only when your words are more beautiful than silence",
    category: "Communication",
    author: "Sanskrit Proverb"
  },
  {
    id: 3,
    text: "Treat others as you wish to be treated - this is the foundation of all morality",
    category: "Ethics",
    author: "Golden Rule"
  },
  {
    id: 4,
    text: "Learn something new every day, no matter how small",
    category: "Growth",
    author: "Continuous Learning"
  },
  {
    id: 5,
    text: "Take care of your body - it's the only place you have to live",
    category: "Health",
    author: "Jim Rohn"
  },
  {
    id: 6,
    text: "Forgive others, not because they deserve forgiveness, but because you deserve peace",
    category: "Inner Peace",
    author: "Buddhist Teaching"
  },
  {
    id: 7,
    text: "Success is not final, failure is not fatal - it's the courage to continue that counts",
    category: "Perseverance",
    author: "Winston Churchill"
  },
  {
    id: 8,
    text: "The best time to plant a tree was 20 years ago, the second best time is now",
    category: "Action",
    author: "Chinese Proverb"
  },
  {
    id: 9,
    text: "Happiness is not something ready-made. It comes from your own actions",
    category: "Happiness",
    author: "Dalai Lama"
  },
  {
    id: 10,
    text: "The mind is everything. What you think you become",
    category: "Mindset",
    author: "Buddha"
  },
  {
    id: 11,
    text: "Listen to understand, not to reply",
    category: "Communication",
    author: "Stephen Covey"
  },
  {
    id: 12,
    text: "Walk slowly through life - notice the beauty around you",
    category: "Mindfulness",
    author: "Zen Teaching"
  },
  {
    id: 13,
    text: "Your character is your destiny",
    category: "Ethics",
    author: "Heraclitus"
  },
  {
    id: 14,
    text: "Read books that challenge your thinking - growth happens outside comfort zones",
    category: "Growth",
    author: "Intellectual Wisdom"
  },
  {
    id: 15,
    text: "Sleep well, eat mindfully, move daily - these are the pillars of health",
    category: "Health",
    author: "Ayurvedic Principle"
  },
  {
    id: 16,
    text: "Inner peace comes from accepting what you cannot control",
    category: "Inner Peace",
    author: "Stoic Philosophy"
  },
  {
    id: 17,
    text: "Fall seven times, stand up eight",
    category: "Perseverance",
    author: "Japanese Proverb"
  },
  {
    id: 18,
    text: "Begin where you are, use what you have, do what you can",
    category: "Action",
    author: "Arthur Ashe"
  },
  {
    id: 19,
    text: "Happiness is found in simple moments and grateful hearts",
    category: "Happiness",
    author: "Life Wisdom"
  },
  {
    id: 20,
    text: "Believe in yourself and your ability to overcome any challenge",
    category: "Mindset",
    author: "Self-Empowerment"
  },
  {
    id: 21,
    text: "Silence is the language of God - practice listening more than speaking",
    category: "Mindfulness",
    author: "Sufi Wisdom"
  },
  {
    id: 22,
    text: "Be kind to everyone you meet - you never know what battles they're fighting",
    category: "Ethics",
    author: "Compassion Teaching"
  },
  {
    id: 23,
    text: "Every expert was once a beginner - embrace being a student",
    category: "Growth",
    author: "Learning Philosophy"
  },
  {
    id: 24,
    text: "Hydrate your body, nourish your soul, rest your mind",
    category: "Health",
    author: "Holistic Wellness"
  },
  {
    id: 25,
    text: "Peace is not the absence of conflict, but the presence of harmony",
    category: "Inner Peace",
    author: "Peace Wisdom"
  },
  {
    id: 26,
    text: "Persistence is the key that unlocks the door to success",
    category: "Perseverance",
    author: "Success Principle"
  },
  {
    id: 27,
    text: "Take small steps daily towards your dreams - progress is progress",
    category: "Action",
    author: "Goal Achievement"
  },
  {
    id: 28,
    text: "Joy is not in things; it is in us",
    category: "Happiness",
    author: "Richard Wagner"
  },
  {
    id: 29,
    text: "Your thoughts create your reality - choose them wisely",
    category: "Mindset",
    author: "Manifestation Wisdom"
  },
  {
    id: 30,
    text: "Express yourself authentically - your uniqueness is your gift to the world",
    category: "Communication",
    author: "Authentic Living"
  }
];

export async function GET() {
  try {
    // Simulate server delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return Response.json({
      success: true,
      data: niyams,
      count: niyams.length
    });
  } catch (error) {
    return Response.json(
      { success: false, error: 'Failed to fetch niyams' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // In a real app, you would save this to your database
    const newNiyam = {
      id: niyams.length + 1,
      text: body.text,
      category: body.category || 'General',
      author: body.author || 'Anonymous'
    };
    
    niyams.push(newNiyam);
    
    return Response.json({
      success: true,
      data: newNiyam
    }, { status: 201 });
  } catch (error) {
    return Response.json(
      { success: false, error: 'Failed to create niyam' },
      { status: 500 }
    );
  }
}
