/**
 * Utility functions for the Niyam app
 */

/**
 * Format date for display
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

/**
 * Get random item from array
 * @param {Array} array - Array to pick from
 * @returns {*} Random item from array
 */
export const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Calculate streak from completion dates
 * @param {Array} completions - Array of completion objects with date property
 * @returns {number} Current streak count
 */
export const calculateStreak = (completions) => {
  if (completions.length === 0) return 0;
  
  const now = new Date();
  const sortedDates = completions
    .map(item => new Date(item.date).toDateString())
    .filter((date, index, self) => self.indexOf(date) === index)
    .sort((a, b) => new Date(b) - new Date(a));
  
  let streak = 0;
  for (let i = 0; i < sortedDates.length; i++) {
    const checkDate = new Date(now);
    checkDate.setDate(checkDate.getDate() - i);
    if (sortedDates[i] === checkDate.toDateString()) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};
