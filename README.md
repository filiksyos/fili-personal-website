# FILI - Personal Website

A stunning personal website featuring a LOKI-style animated hero section and an AI-powered chat interface.

## ✨ Features

- **🎬 LOKI Hero Animation**: Dramatic animated text with rapidly switching fonts creating a cinematic intro effect
- **💬 AI Chat Interface**: Interactive chat section for conversations about Fili
- **📱 Responsive Design**: Fully responsive layout optimized for desktop, tablet, and mobile devices
- **⚡ Modern Stack**: Built with Next.js 15, React 19, TypeScript, and Tailwind CSS 4

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/filiksyos/fili-personal-website.git
cd fili-personal-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🎨 Customization

### Change the Hero Text

Edit `components/LokiHero.tsx` and modify the `word` variable:
```typescript
const word = 'FILI'; // Change to any 4-letter word
```

### Add OpenRouter AI Integration

To enable real AI responses instead of mock responses:

1. Get an API key from [OpenRouter](https://openrouter.ai/)
2. Create a `.env.local` file:
```env
OPENROUTER_API_KEY=your_api_key_here
```
3. Update `app/api/chat/route.ts` to integrate with OpenRouter API

### Customize Colors

Edit `tailwind.config.ts` to change the color scheme:
```typescript
theme: {
  extend: {
    colors: {
      // Add your custom colors
    }
  }
}
```

## 📦 Tech Stack

- **Framework**: Next.js 15.5.4 with App Router
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript 5
- **Development**: Turbopack for fast builds

## 🏗️ Project Structure

```
fili-personal-website/
├── app/
│   ├── api/chat/         # Chat API endpoint
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/
│   ├── LokiHero.tsx      # LOKI animation component
│   └── ChatInterface.tsx # Chat UI component
├── lib/
│   └── fonts.ts          # Font configuration
├── public/
│   └── fonts.css         # Font-face declarations
└── package.json
```

## 🎭 Font Animation

The LOKI hero animation uses 27 different fonts that switch randomly every 900ms. All fonts are loaded from CDN for optimal performance.

## 📝 License

MIT License - feel free to use this project for your own personal website!

## 🙏 Credits

Inspired by:
- [LOKI Intro Creator](https://github.com/filiksyos/loki-intro-creator) for the animation concept
- [AIChat](https://github.com/matinmousavi/AIChat) for the chat interface design

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if you like this project!

---

Made with ❤️ by Fili
