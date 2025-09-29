# Niyam - Daily Wisdom & Principles

A beautiful, modern Next.js application that presents daily niyams (principles) in an aesthetic and engaging way. Perfect for users of all ages who seek daily inspiration and wisdom.

## ✨ Features

### 🎯 **Daily Niyam Display**
- Beautiful, card-based design showcasing wisdom and principles
- Random niyam selection with smooth animations
- Categorized niyams (Mindfulness, Ethics, Growth, Health, etc.)
- Attribution to original authors and sources

### 🔔 **Push Notifications**
- Browser push notifications for daily niyams
- Configurable intervals:
  - **Every Minute** (for testing purposes)
  - **Daily** (recommended for regular use)
- Immediate notification when enabled
- Beautiful notification design with niyam content

### 🎨 **Modern Design**
- Responsive design that works on all devices
- Beautiful gradient backgrounds and modern typography
- Smooth animations using Framer Motion
- Dark mode support
- Accessible design for users of all ages

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd niyam
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: SVG icons (globe, etc.)

## 📱 Push Notifications

The app includes a sophisticated push notification system:

- **Permission Request**: Users can enable notifications with a simple toggle
- **Flexible Timing**: Choose between testing (every minute) or daily notifications
- **Smart Scheduling**: Notifications are automatically scheduled and managed
- **Rich Content**: Each notification includes the niyam text and proper attribution

### Testing Notifications
- Set interval to "Every Minute" for rapid testing
- Notifications will appear immediately when enabled
- Switch back to "Daily" for normal usage

## 🔧 API Endpoints

The app includes sample API routes for future server integration:

- `GET /api/niyams` - Fetch all available niyams
- `POST /api/niyams` - Create a new niyam (for admin use)

## 🎨 Customization

### Adding New Niyams
Edit the `niyams` array in `src/app/page.js` or use the API endpoint to add new wisdom.

### Styling
The app uses Tailwind CSS with custom CSS variables. Modify `src/app/globals.css` for theme changes.

### Animations
Framer Motion animations can be customized in the main page component.

## 🌟 Design Philosophy

- **Simplicity**: Clean, uncluttered interface that's easy to navigate
- **Accessibility**: High contrast, readable fonts, and intuitive controls
- **Responsiveness**: Works seamlessly across all device sizes
- **Modern Aesthetics**: Beautiful gradients, shadows, and smooth transitions

## 📱 Browser Support

- Chrome/Edge (recommended for notifications)
- Firefox
- Safari
- Mobile browsers

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Other Platforms
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Wisdom teachings from various cultures and traditions
- Next.js team for the amazing framework
- Framer Motion for smooth animations
- Tailwind CSS for beautiful styling

---

**Made with ❤️ for daily inspiration and growth**
