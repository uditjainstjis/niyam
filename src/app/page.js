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

  useEffect(() => {
    setRandomNiyam();
    if ('Notification' in window && Notification.permission === 'granted') {
      setIsNotificationEnabled(true);
      scheduleNotifications();
    }
  }, []);

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
    const oneDay = 24 * 60 * 60 * 1000;
    setInterval(sendNotification, oneDay);
  };

  const categoryStyles = {
    "Food / Eating": "bg-orange-100 text-orange-800 border-orange-200",
    "Habits / Lifestyle": "bg-blue-100 text-blue-800 border-blue-200",
    "Mind / Spirit": "bg-green-100 text-green-800 border-green-200",
  };
  const getCategoryColor = (category) =>
    categoryStyles[category] || "bg-gray-100 text-gray-800 border-gray-200";

  return (
    <div className="min-h-screen bg-white">
      <header className="text-center py-12 px-4 bg-gradient-to-b from-orange-50 to-white">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-800 mb-3">
          Niyam
        </h1>
        <p className="text-lg text-orange-600 max-w-md mx-auto">
          Daily principles for mindful living
        </p>
      </header>

      <main className="max-w-2xl mx-auto px-4 pb-12">
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
                Get Another Niyam
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            </div>
          )}
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
