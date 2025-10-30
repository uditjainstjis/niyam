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
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Food / Eating', 'Habits / Lifestyle', 'Mind / Spirit'];

  useEffect(() => {
    setRandomNiyam();
    if ('Notification' in window && Notification.permission === 'granted') {
      setIsNotificationEnabled(true);
      scheduleNotifications();
    }
  }, [selectedCategory]);

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
    <div className="min-h-screen bg-white">
      <header className="text-center py-12 px-4 bg-linear-to-b from-orange-50 to-white">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-800 mb-3">
          Niyam
        </h1>
        <p className="text-lg text-orange-600 max-w-md mx-auto">
          Daily principles for mindful living
        </p>
      </header>

      <main className="max-w-2xl mx-auto px-4 pb-12">
        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-700 mb-3 text-center">Filter by Category</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-orange-600 text-white shadow-md scale-105'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-orange-400 hover:bg-orange-50'
                }`}
              >
                {category === 'All' ? '🌟 All' : category}
                {category !== 'All' && (
                  <span className="ml-1 text-xs opacity-75">
                    ({niyams.filter(n => n.category === category).length})
                  </span>
                )}
              </button>
            ))}
          </div>
          {selectedCategory !== 'All' && (
            <div className="mt-3 text-center">
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-sm text-orange-600 hover:text-orange-700 underline"
              >
                Clear filter
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-orange-100">
          {currentNiyam ? (
            <div className="text-center">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-6 border ${getCategoryColor(currentNiyam.category)}`}>
                {currentNiyam.category}
              </span>
              
              <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-8 leading-relaxed">
                {currentNiyam.text}
              </h2>
              
              <button
                onClick={setRandomNiyam}
                className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-8 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                {selectedCategory === 'All' ? 'Get Another Niyam' : `Get Another from ${selectedCategory}`}
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            </div>
          )}
        </div>

        {/* Category Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-200 text-center">
            <div className="text-2xl font-bold text-orange-700">
              {niyams.filter(n => n.category === 'Food / Eating').length}
            </div>
            <div className="text-xs text-orange-600 mt-1">Food / Eating</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 text-center">
            <div className="text-2xl font-bold text-blue-700">
              {niyams.filter(n => n.category === 'Habits / Lifestyle').length}
            </div>
            <div className="text-xs text-blue-600 mt-1">Habits / Lifestyle</div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-200 text-center">
            <div className="text-2xl font-bold text-green-700">
              {niyams.filter(n => n.category === 'Mind / Spirit').length}
            </div>
            <div className="text-xs text-green-600 mt-1">Mind / Spirit</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800 text-lg">Daily Reminders</h3>
              <p className="text-gray-600 text-sm mt-1">
                Get a new niyam notification every day
              </p>
            </div>
            
            <button
              onClick={requestNotificationPermission}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isNotificationEnabled 
                  ? 'bg-orange-600' 
                  : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isNotificationEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              {isNotificationEnabled 
                ? 'Notifications enabled - you\'ll receive daily niyams'
                : 'Click the toggle to enable daily notifications'
              }
            </p>
          </div>
        </div>
      </main>

      <footer className="text-center py-8 px-4 border-t border-orange-100">
        <p className="text-orange-600 text-sm">
          Made with ❤️ for mindful living
        </p>
      </footer>
    </div>
  );
}
