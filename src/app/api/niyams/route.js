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
