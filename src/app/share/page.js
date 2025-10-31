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
  const [customText, setCustomText] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [cardStyle, setCardStyle] = useState('gradient');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isGenerating, setIsGenerating] = useState(false);
  const cardRef = useRef(null);

  const backgroundOptions = [
    { name: 'Orange', value: 'orange', gradient: 'from-orange-400 to-orange-600' },
    { name: 'Blue', value: 'blue', gradient: 'from-blue-400 to-blue-600' },
    { name: 'Green', value: 'green', gradient: 'from-green-400 to-green-600' },
    { name: 'Purple', value: 'purple', gradient: 'from-purple-400 to-purple-600' },
    { name: 'Pink', value: 'pink', gradient: 'from-pink-400 to-pink-600' },
    { name: 'Indigo', value: 'indigo', gradient: 'from-indigo-400 to-indigo-600' },
    { name: 'Sunset', value: 'sunset', gradient: 'from-orange-500 via-red-500 to-pink-500' },
    { name: 'Ocean', value: 'ocean', gradient: 'from-blue-600 via-blue-700 to-indigo-800' },
    { name: 'Forest', value: 'forest', gradient: 'from-green-600 via-green-700 to-emerald-800' },
    { name: 'Aurora', value: 'aurora', gradient: 'from-purple-600 via-pink-600 to-blue-600' }
  ];

  const cardStyles = [
    { name: 'Gradient', value: 'gradient' },
    { name: 'Solid', value: 'solid' },
    { name: 'Pattern', value: 'pattern' }
  ];

  const fontSizes = [
    { name: 'Small', value: 'small', class: 'text-lg md:text-xl' },
    { name: 'Medium', value: 'medium', class: 'text-xl md:text-2xl' },
    { name: 'Large', value: 'large', class: 'text-2xl md:text-3xl' }
  ];

  const categories = ['All', 'Food / Eating', 'Habits / Lifestyle', 'Mind / Spirit'];

  const getBgGradient = () => {
    const bg = backgroundOptions.find(bg => bg.value === bgColor);
    return bg ? bg.gradient : 'from-orange-400 to-orange-600';
  };

  const getCardBackground = () => {
    const gradient = getBgGradient();
    switch (cardStyle) {
      case 'solid':
        return bgColor === 'orange' ? 'bg-orange-500' : 
               bgColor === 'blue' ? 'bg-blue-500' :
               bgColor === 'green' ? 'bg-green-500' :
               bgColor === 'purple' ? 'bg-purple-500' :
               bgColor === 'pink' ? 'bg-pink-500' :
               bgColor === 'indigo' ? 'bg-indigo-500' :
               'bg-orange-500';
      case 'pattern':
        return `bg-linear-to-br ${gradient} bg-opacity-90 relative`;
      default:
        return `bg-linear-to-br ${gradient}`;
    }
  };

  const getFontSizeClass = () => {
    const font = fontSizes.find(f => f.value === fontSize);
    return font ? font.class : 'text-xl md:text-2xl';
  };

  const getFilteredNiyams = () => {
    if (selectedCategory === 'All') return niyams;
    return niyams.filter(n => n.category === selectedCategory);
  };

  const getRandomNiyam = () => {
    const filtered = getFilteredNiyams();
    const randomIndex = Math.floor(Math.random() * filtered.length);
    setSelectedNiyam(filtered[randomIndex]);
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

  const downloadAsImage = async (format = 'png') => {
    if (!cardRef.current) return;

    setIsGenerating(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 3,
        width: 800,
        height: 533,
        useCORS: true,
        allowTaint: true
      });
      
      const link = document.createElement('a');
      const timestamp = new Date().toISOString().slice(0, 10);
      link.download = `niyam-${selectedNiyam.id}-${timestamp}.${format}`;
      
      if (format === 'jpg') {
        // Create white background for JPG
        const jpgCanvas = document.createElement('canvas');
        jpgCanvas.width = canvas.width;
        jpgCanvas.height = canvas.height;
        const ctx = jpgCanvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, jpgCanvas.width, jpgCanvas.height);
        ctx.drawImage(canvas, 0, 0);
        link.href = jpgCanvas.toDataURL('image/jpeg', 0.9);
      } else {
        link.href = canvas.toDataURL(`image/${format}`);
      }
      
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Error generating image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const shareAsText = () => {
    const currentNiyam = isCustomMode ? { text: customText, category: 'Custom' } : selectedNiyam;
    const shareText = `"${currentNiyam.text}" - ${currentNiyam.category}\n\nShare your daily mindful practice at ${window.location.origin}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Daily Niyam',
        text: shareText,
        url: window.location.origin
      }).catch(console.error);
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Niyam copied to clipboard!');
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Niyam copied to clipboard!');
    }
  };

  const saveToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteNiyams') || '[]');
    const niyamToSave = isCustomMode ? { 
      id: Date.now(), 
      text: customText, 
      category: 'Custom',
      isCustom: true 
    } : selectedNiyam;
    
    if (!favorites.find(fav => fav.id === niyamToSave.id)) {
      favorites.push(niyamToSave);
      localStorage.setItem('favoriteNiyams', JSON.stringify(favorites));
      alert('Niyam saved to favorites!');
    } else {
      alert('This niyam is already in your favorites!');
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
            {/* Mode Toggle */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setIsCustomMode(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    !isCustomMode 
                      ? 'bg-orange-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Select Niyam
                </button>
                <button
                  onClick={() => setIsCustomMode(true)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    isCustomMode 
                      ? 'bg-orange-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Custom Text
                </button>
              </div>

              {isCustomMode ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter your custom niyam:
                  </label>
                  <textarea
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="Write your own daily principle..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                    rows={3}
                    maxLength={150}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {customText.length}/150 characters
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex gap-2 mb-3">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <button
                      onClick={getRandomNiyam}
                      className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
                    >
                      🎲 Random
                    </button>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {getFilteredNiyams().map((niyam) => (
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
              )}
            </div>

            {/* Style Options */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Card Style</h3>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {cardStyles.map((style) => (
                  <button
                    key={style.value}
                    onClick={() => setCardStyle(style.value)}
                    className={`p-2 rounded-lg border-2 transition-all text-sm ${
                      cardStyle === style.value ? 'border-gray-900 bg-gray-50' : 'border-gray-200'
                    }`}
                  >
                    {style.name}
                  </button>
                ))}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                <div className="grid grid-cols-3 gap-2">
                  {fontSizes.map((size) => (
                    <button
                      key={size.value}
                      onClick={() => setFontSize(size.value)}
                      className={`p-2 rounded-lg border-2 transition-all text-sm ${
                        fontSize === size.value ? 'border-gray-900 bg-gray-50' : 'border-gray-200'
                      }`}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Background Color */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Background Style</h3>
              <div className="grid grid-cols-2 gap-3">
                {backgroundOptions.map((bg) => (
                  <button
                    key={bg.value}
                    onClick={() => setBgColor(bg.value)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      bgColor === bg.value ? 'border-gray-900' : 'border-gray-200'
                    }`}
                  >
                    <div className={`w-full h-6 rounded bg-linear-to-r ${bg.gradient} mb-2`}></div>
                    <p className="text-xs text-gray-700">{bg.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Options</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => downloadAsImage('png')}
                    disabled={isGenerating}
                    className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1 text-sm"
                  >
                    📁 PNG
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => downloadAsImage('jpg')}
                    disabled={isGenerating}
                    className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1 text-sm"
                  >
                    📸 JPG
                  </motion.button>
                </div>
                
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

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={saveToFavorites}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Save to Favorites
                </motion.button>

                {isGenerating && (
                  <div className="text-center py-2">
                    <div className="inline-flex items-center gap-2 text-orange-600">
                      <div className="animate-spin w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full"></div>
                      Generating image...
                    </div>
                  </div>
                )}
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
                className={`w-full aspect-3/2 ${getCardBackground()} rounded-xl p-8 flex flex-col justify-center items-center text-white shadow-xl relative overflow-hidden`}
              >
                {cardStyle === 'pattern' && (
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-size-[20px_20px]"></div>
                  </div>
                )}
                
                <div className="text-center space-y-6 relative z-10">
                  <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium border ${getCategoryColor(isCustomMode ? 'Custom' : selectedNiyam.category)} bg-white/90`}>
                    {isCustomMode ? 'Custom' : selectedNiyam.category}
                  </div>
                  
                  <blockquote className={`${getFontSizeClass()} font-medium leading-relaxed text-center max-w-md`}>
                    "{isCustomMode ? customText : selectedNiyam.text}"
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

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-orange-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-orange-600">{niyams.length}</div>
                  <div className="text-xs text-orange-700">Total Niyams</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-blue-600">{getFilteredNiyams().length}</div>
                  <div className="text-xs text-blue-700">In Category</div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-linear-to-r from-orange-50 to-yellow-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Tips</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Use custom text to create your own principles</li>
                <li>• Try different backgrounds for various moods</li>
                <li>• Save your favorites for quick access</li>
                <li>• Download as PNG for transparency, JPG for smaller files</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
