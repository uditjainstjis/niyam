'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
  { id: 30, text: "Help one person today (small way).", category: "Mind / Spirit" },
  { id: 31, text: "No fried food today.", category: "Food / Eating" },
  { id: 32, text: "Drink 8 glasses of water today.", category: "Habits / Lifestyle" },
  { id: 33, text: "Practice gratitude for 2 minutes.", category: "Mind / Spirit" },
  { id: 34, text: "Take the stairs instead of elevator.", category: "Habits / Lifestyle" },
  { id: 35, text: "No sweet snacks today.", category: "Food / Eating" }
];

export default function SharePage() {
  const [selectedNiyam, setSelectedNiyam] = useState(niyams[0]);
  const [bgColor, setBgColor] = useState('orange');
  const cardRef = useRef(null);

  const backgroundOptions = [
    { name: 'Orange', value: 'orange', gradient: 'from-orange-400 to-orange-600' },
    { name: 'Blue', value: 'blue', gradient: 'from-blue-400 to-blue-600' },
    { name: 'Green', value: 'green', gradient: 'from-green-400 to-green-600' },
    { name: 'Purple', value: 'purple', gradient: 'from-purple-400 to-purple-600' },
    { name: 'Pink', value: 'pink', gradient: 'from-pink-400 to-pink-600' },
    { name: 'Indigo', value: 'indigo', gradient: 'from-indigo-400 to-indigo-600' }
  ];

  const getBgGradient = () => {
    const bg = backgroundOptions.find(bg => bg.value === bgColor);
    return bg ? bg.gradient : 'from-orange-400 to-orange-600';
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

  const downloadAsImage = async () => {
    if (!cardRef.current) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        width: 600,
        height: 400
      });
      
      const link = document.createElement('a');
      link.download = `niyam-${selectedNiyam.id}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Error generating image. Please try again.');
    }
  };

  const shareAsText = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Daily Niyam',
        text: `"${selectedNiyam.text}" - ${selectedNiyam.category}`,
        url: window.location.origin
      });
    } else {
      navigator.clipboard.writeText(`"${selectedNiyam.text}" - ${selectedNiyam.category}\n\nShare your daily mindful practice at ${window.location.origin}`);
      alert('Niyam copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Share Your Niyam</h1>
          <p className="text-gray-600">Create beautiful images to share your daily principles</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            {/* Niyam Selection */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Niyam</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {niyams.map((niyam) => (
                  <button
                    key={niyam.id}
                    onClick={() => setSelectedNiyam(niyam)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedNiyam.id === niyam.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-900">{niyam.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{niyam.category}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Background Color */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Background Style</h3>
              <div className="grid grid-cols-3 gap-3">
                {backgroundOptions.map((bg) => (
                  <button
                    key={bg.value}
                    onClick={() => setBgColor(bg.value)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      bgColor === bg.value ? 'border-gray-900' : 'border-gray-200'
                    }`}
                  >
                    <div className={`w-full h-8 rounded bg-gradient-to-r ${bg.gradient} mb-2`}></div>
                    <p className="text-xs text-gray-700">{bg.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Options</h3>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={downloadAsImage}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download as Image
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={shareAsText}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Share as Text
                </motion.button>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
              
              {/* Shareable Card */}
              <div 
                ref={cardRef}
                className={`w-full aspect-[3/2] bg-gradient-to-br ${getBgGradient()} rounded-xl p-8 flex flex-col justify-center items-center text-white shadow-xl`}
              >
                <div className="text-center space-y-6">
                  <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium border ${getCategoryColor(selectedNiyam.category)} bg-white/90`}>
                    {selectedNiyam.category}
                  </div>
                  
                  <blockquote className="text-xl md:text-2xl font-medium leading-relaxed text-center max-w-md">
                    "{selectedNiyam.text}"
                  </blockquote>
                  
                  <div className="pt-4">
                    <div className="text-lg font-bold">Niyam</div>
                    <div className="text-sm opacity-90">Daily principles for mindful living</div>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mt-4 text-center">
                This is how your niyam will appear when shared as an image
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
