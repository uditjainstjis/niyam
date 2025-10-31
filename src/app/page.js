'use client';

import { useState, useEffect } from 'react';

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

    // Add keyboard navigation
    const handleKeyPress = (event) => {
      if (event.key === 'n' || event.key === 'N') {
        event.preventDefault();
        setRandomNiyam();
      }
      if (event.key === 't' || event.key === 'T') {
        event.preventDefault();
        toggleDarkMode();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    
    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

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
    const randomIndex = Math.floor(Math.random() * niyams.length);
    setCurrentNiyam(niyams[randomIndex]);
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
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Habits / Lifestyle':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Mind / Spirit':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-orange-600 text-white px-4 py-2 rounded-md z-50">
        Skip to main content
      </a>
      <header className="text-center py-12 px-4 bg-linear-to-b from-orange-50 to-white dark:from-gray-800 dark:to-gray-900" role="banner">
        <div className="flex justify-end max-w-2xl mx-auto mb-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-orange-100 dark:bg-gray-700 hover:bg-orange-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            type="button"
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
          </button>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-orange-800 dark:text-orange-400 mb-3" id="app-title">
          Niyam
        </h1>
        <p className="text-lg text-orange-600 dark:text-orange-300 max-w-md mx-auto" role="doc-subtitle">
          Daily principles for mindful living
        </p>
      </header>

      <main className="max-w-2xl mx-auto px-4 pb-12" id="main-content" role="main">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 border border-orange-100 dark:border-gray-700 transition-colors duration-300" role="article" aria-labelledby="daily-niyam-heading">
          <h2 id="daily-niyam-heading" className="sr-only">Today's Daily Niyam</h2>
          {currentNiyam ? (
            <div className="text-center">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-6 border ${getCategoryColor(currentNiyam.category)}`} role="tag" aria-label={`Category: ${currentNiyam.category}`}>
                {currentNiyam.category}
              </span>
              
              <h3 className="text-2xl md:text-3xl font-medium text-gray-800 dark:text-gray-100 mb-8 leading-relaxed" aria-live="polite" role="region" aria-label="Current niyam text">
                {currentNiyam.text}
              </h3>
              
              <button
                onClick={setRandomNiyam}
                className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white font-medium py-3 px-8 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                aria-label="Get a new random niyam"
                type="button"
              >
                Get Another Niyam
              </button>
              
              <div className="mt-6 text-center">
                <details className="inline-block text-left">
                  <summary className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">
                    Keyboard shortcuts
                  </summary>
                  <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-300">
                    <div className="space-y-1">
                      <div><kbd className="px-2 py-1 bg-white dark:bg-gray-600 rounded text-xs font-mono">N</kbd> - New niyam</div>
                      <div><kbd className="px-2 py-1 bg-white dark:bg-gray-600 rounded text-xs font-mono">T</kbd> - Toggle theme</div>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          ) : (
            <div className="text-center py-12" role="status" aria-label="Loading niyam">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 dark:border-orange-400 mx-auto" aria-hidden="true"></div>
              <span className="sr-only">Loading your daily niyam...</span>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-orange-100 dark:border-gray-700 transition-colors duration-300" role="region" aria-labelledby="notification-settings">
          <div className="flex items-center justify-between">
            <div>
              <h3 id="notification-settings" className="font-medium text-gray-800 dark:text-gray-100 text-lg">Daily Reminders</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                Get a new niyam notification every day
              </p>
            </div>
            
            <button
              onClick={requestNotificationPermission}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                isNotificationEnabled 
                  ? 'bg-orange-600 dark:bg-orange-500' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
              role="switch"
              aria-checked={isNotificationEnabled}
              aria-labelledby="notification-settings"
              aria-describedby="notification-description"
              type="button"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isNotificationEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
                aria-hidden="true"
              />
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <p id="notification-description" className="text-sm text-gray-500 dark:text-gray-400" aria-live="polite">
              {isNotificationEnabled 
                ? 'Notifications enabled - you\'ll receive daily niyams'
                : 'Click the toggle to enable daily notifications'
              }
            </p>
          </div>
        </div>
      </main>

      <footer className="text-center py-8 px-4 border-t border-orange-100 dark:border-gray-700" role="contentinfo">
        <p className="text-orange-600 dark:text-orange-400 text-sm">
          Made with <span aria-label="love">❤️</span> for mindful living
        </p>
      </footer>
    </div>
  );
}
