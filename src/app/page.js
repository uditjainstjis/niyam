'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const niyams = [
  { id: 1, text: "No chips today.", category: "Food / Eating" },
  { id: 2, text: "No cold drink today.", category: "Food / Eating" },
  { id: 3, text: "No chocolate today.", category: "Food / Eating" },
  { id: 4, text: "No pizza today.", category: "Food / Eating" },
  { id: 5, text: "No burger today.", category: "Food / Eating" },
  { id: 6, text: "No ice-cream today.", category: "Food / Eating" },
  { id: 7, text: "No samosa today.", category: "Food / Eating" },
  { id: 8, text: "No cake today.", category: "Food / Eating" },
  { id: 9, text: "No pakora today.", category: "Food / Eating" },
  { id: 10, text: "No noodles today.", category: "Food / Eating" },
  { id: 11, text: "No WhatsApp status/posting today.", category: "Habits / Lifestyle" },
  { id: 12, text: "No Instagram reels today.", category: "Habits / Lifestyle" },
  { id: 13, text: "No gossiping today.", category: "Habits / Lifestyle" },
  { id: 14, text: "Don't leave light/fan on when not in use.", category: "Habits / Lifestyle" },
  { id: 15, text: "Walk 1000 extra steps today.", category: "Habits / Lifestyle" },
  { id: 16, text: "No anger words today.", category: "Habits / Lifestyle" },
  { id: 17, text: "Say thank you to 3 people today.", category: "Habits / Lifestyle" },
  { id: 18, text: "Don't waste water (close tap quickly).", category: "Habits / Lifestyle" },
  { id: 19, text: "Sleep before 11 PM today.", category: "Habits / Lifestyle" },
  { id: 20, text: "No negative news today.", category: "Habits / Lifestyle" },
  { id: 21, text: "Do 5 minutes of meditation.", category: "Mind / Spirit" },
  { id: 22, text: "Say sorry to one person.", category: "Mind / Spirit" },
  { id: 23, text: "Forgive one person in your mind.", category: "Mind / Spirit" },
  { id: 24, text: "Sit in silence for 10 minutes.", category: "Mind / Spirit" },
  { id: 25, text: "Recite Navkar Mantra 9 times (or say \"Thank you God\").", category: "Mind / Spirit" },
  { id: 26, text: "Write one good thing about your day.", category: "Mind / Spirit" },
  { id: 27, text: "Spend 5 minutes in nature.", category: "Mind / Spirit" },
  { id: 28, text: "Avoid complaining today.", category: "Mind / Spirit" },
  { id: 29, text: "Eat one meal without phone/TV.", category: "Mind / Spirit" },
  { id: 30, text: "Help one person today (small way).", category: "Mind / Spirit" }
];

export default function Home() {
  const [currentNiyam, setCurrentNiyam] = useState(null);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [completedNiyams, setCompletedNiyams] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [stats, setStats] = useState({
    total: 0,
    thisWeek: 0,
    streak: 0
  });

  const categories = ['All', 'Food / Eating', 'Habits / Lifestyle', 'Mind / Spirit'];

  useEffect(() => {
    setRandomNiyam();
    if ('Notification' in window && Notification.permission === 'granted') {
      setIsNotificationEnabled(true);
      scheduleNotifications();
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    // Load completed niyams from localStorage
    const saved = localStorage.getItem('completedNiyams');
    if (saved) {
      const completed = JSON.parse(saved);
      setCompletedNiyams(completed);
      calculateStats(completed);
    }
  }, [selectedCategory]);

  const calculateStats = (completed) => {
    const total = completed.length;
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisWeek = completed.filter(item => new Date(item.date) >= weekAgo).length;
    
    // Calculate streak
    let streak = 0;
    const sortedDates = completed
      .map(item => new Date(item.date).toDateString())
      .filter((date, index, self) => self.indexOf(date) === index)
      .sort((a, b) => new Date(b) - new Date(a));
    
    for (let i = 0; i < sortedDates.length; i++) {
      const checkDate = new Date(now);
      checkDate.setDate(checkDate.getDate() - i);
      if (sortedDates[i] === checkDate.toDateString()) {
        streak++;
      } else {
        break;
      }
    }
    
    setStats({ total, thisWeek, streak });
  };

  const markAsComplete = () => {
    if (!currentNiyam) return;
    
    const newCompletion = {
      id: currentNiyam.id,
      text: currentNiyam.text,
      category: currentNiyam.category,
      date: new Date().toISOString()
    };
    
    const updated = [...completedNiyams, newCompletion];
    setCompletedNiyams(updated);
    localStorage.setItem('completedNiyams', JSON.stringify(updated));
    calculateStats(updated);
    
    // Get a new niyam after marking complete
    setRandomNiyam();
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const setRandomNiyam = () => {
    const filteredNiyams = selectedCategory === 'All' 
      ? niyams 
      : niyams.filter(n => n.category === selectedCategory);
    
    if (filteredNiyams.length === 0) {
      setCurrentNiyam(niyams[0]);
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * filteredNiyams.length);
    setCurrentNiyam(filteredNiyams[randomIndex]);
  };

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications');
      return;
    }
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setIsNotificationEnabled(true);
      scheduleNotifications();
    }
  };

  const scheduleNotifications = () => {
    const sendNotification = () => {
      if (Notification.permission === 'granted') {
        const randomNiyam = niyams[Math.floor(Math.random() * niyams.length)];
        new Notification('Today\'s Niyam', {
          body: randomNiyam.text,
          icon: '/globe.svg',
          tag: 'niyam-notification'
        });
      }
    };
    sendNotification();
    setInterval(sendNotification, 2000);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Food / Eating':
        return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-200 dark:border-orange-700';
      case 'Habits / Lifestyle':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700';
      case 'Mind / Spirit':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-12 px-4 bg-linear-to-b from-orange-50 to-white dark:from-gray-800 dark:to-gray-900"
      >
        <div className="flex justify-end max-w-2xl mx-auto mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-orange-100 dark:bg-gray-700 hover:bg-orange-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </motion.button>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-orange-800 dark:text-orange-400 mb-3">
          Niyam
        </h1>
        <p className="text-lg text-orange-600 dark:text-orange-300 max-w-md mx-auto">
          Daily principles for mindful living
        </p>
      </motion.header>

      <main className="max-w-2xl mx-auto px-4 pb-12">
        {/* Statistics Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-orange-100 dark:border-gray-700 text-center">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{stats.total}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Completed</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-blue-100 dark:border-gray-700 text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.thisWeek}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">This Week</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-green-100 dark:border-gray-700 text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.streak}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Day Streak 🔥</div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">Filter by Category</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-orange-600 text-white shadow-md scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-gray-700'
                }`}
              >
                {category === 'All' ? '🌟 All' : category}
                {category !== 'All' && (
                  <span className="ml-1 text-xs opacity-75">
                    ({niyams.filter(n => n.category === category).length})
                  </span>
                )}
              </motion.button>
            ))}
          </div>
          {selectedCategory !== 'All' && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 text-center"
            >
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 underline"
              >
                Clear filter
              </button>
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 border border-orange-100 dark:border-gray-700 transition-colors duration-300"
        >
          {currentNiyam ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentNiyam.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-6 border ${getCategoryColor(currentNiyam.category)}`}
                >
                  {currentNiyam.category}
                </motion.span>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-3xl font-medium text-gray-800 dark:text-gray-100 mb-8 leading-relaxed"
                >
                  {currentNiyam.text}
                </motion.h2>
                
                <div className="flex gap-3 justify-center flex-wrap">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={markAsComplete}
                    className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-medium py-3 px-8 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Mark Complete
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={setRandomNiyam}
                    className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white font-medium py-3 px-8 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    {selectedCategory === 'All' ? 'Get Another Niyam' : `Get Another from ${selectedCategory}`}
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 dark:border-orange-400 mx-auto"></div>
            </div>
          )}
        </motion.div>

        {/* Recent Completions */}
        {completedNiyams.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-orange-100 dark:border-gray-700 transition-colors duration-300"
          >
            <h3 className="font-medium text-gray-800 dark:text-gray-100 text-lg mb-4">Recent Completions</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {completedNiyams.slice(-5).reverse().map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                >
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 dark:text-gray-200">{item.text}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(item.date).toLocaleDateString()} at {new Date(item.date).toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Category Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-orange-100 dark:border-gray-700 transition-colors duration-300"
        >
          <h3 className="font-medium text-gray-800 dark:text-gray-100 text-lg mb-4">Niyams by Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl p-4 text-center border border-orange-200 dark:border-orange-700"
            >
              <p className="text-3xl font-bold text-orange-700 dark:text-orange-300">
                {niyams.filter(n => n.category === '🍽️ Food/Eating').length}
              </p>
              <p className="text-sm font-medium text-orange-600 dark:text-orange-400 mt-2">🍽️ Food/Eating</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl p-4 text-center border border-blue-200 dark:border-blue-700"
            >
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                {niyams.filter(n => n.category === '🏃 Habits/Lifestyle').length}
              </p>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-2">🏃 Habits/Lifestyle</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-xl p-4 text-center border border-green-200 dark:border-green-700"
            >
              <p className="text-3xl font-bold text-green-700 dark:text-green-300">
                {niyams.filter(n => n.category === '🧘 Mind/Spirit').length}
              </p>
              <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-2">🧘 Mind/Spirit</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-orange-100 dark:border-gray-700 transition-colors duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-100 text-lg">Daily Reminders</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                Get a new niyam notification every day
              </p>
            </div>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={requestNotificationPermission}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isNotificationEnabled 
                  ? 'bg-orange-600 dark:bg-orange-500' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <motion.span
                animate={{ x: isNotificationEnabled ? 24 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="inline-block h-4 w-4 rounded-full bg-white"
              />
            </motion.button>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isNotificationEnabled 
                ? 'Notifications enabled - you\'ll receive daily niyams'
                : 'Click the toggle to enable daily notifications'
              }
            </p>
          </div>
        </motion.div>
      </main>

      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center py-8 px-4 border-t border-orange-100 dark:border-gray-700"
      >
        <p className="text-orange-600 dark:text-orange-400 text-sm">
          Made with ❤️ for mindful living
        </p>
      </motion.footer>
    </div>
  );
}
