# 🌱 CarbonWise AI

<div align="center">

# AI-Powered Carbon Footprint Awareness Platform

Track, analyze, and reduce your carbon footprint with AI-driven insights, sustainability simulations, and gamified eco-challenges.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-Production-success)

</div>

---

# 📖 Overview

CarbonWise AI is a full-stack web application designed to help individuals understand, track, and reduce their carbon footprint through personalized insights, AI-powered coaching, sustainability simulations, and environmental awareness tools.

The platform converts everyday activities into measurable carbon emissions and provides practical recommendations to encourage sustainable behavior.

---

# 🎯 Chosen Vertical

### Sustainability & Environmental Awareness

CarbonWise AI is built under the Sustainability and Environmental Awareness vertical.

The platform focuses on helping users:

- Understand their carbon footprint
- Track environmental impact over time
- Identify major emission sources
- Receive personalized sustainability recommendations
- Reduce emissions through simple lifestyle changes

Target users include:

- Students
- Working Professionals
- Families
- Environmentally Conscious Individuals
- Educational Institutions

---

# 🚀 Features

## 🌍 Carbon Footprint Calculator

Calculate emissions from:

- Transportation
- Energy Consumption
- Food Habits
- Lifestyle Activities

---

## 📊 Interactive Dashboard

Provides:

- Monthly Carbon Footprint
- Weekly Analysis
- Emission Breakdown
- Sustainability Score
- Trend Visualizations

---

## 🤖 AI Sustainability Coach

AI-powered assistant capable of:

- Carbon Hotspot Analysis
- Personalized Recommendations
- Sustainability Guidance
- Environmental Awareness Education
- Hinglish Support

---

## 🎯 Carbon Reduction Simulator

Users can:

- Modify lifestyle activities
- Compare current and optimized scenarios
- Estimate potential savings
- Visualize reduction impact instantly

---

## 🏆 Eco Challenges

Gamified sustainability system:

- Public Transport Challenge
- No Car Day
- Green Shopping Challenge
- Save Electricity Challenge
- Plant-Based Week
- Bike Commute Challenge

---

## 📈 Progress Tracking

Track:

- Historical Carbon Data
- Weekly Improvement
- Monthly Trends
- Sustainability Growth

---

## 🌱 Sustainability Score Engine

Score Range:

- 80 – 100 → Excellent
- 60 – 79 → Good
- 40 – 59 → Average
- Below 40 → Needs Improvement

---

# 🧠 Approach & Logic

The platform follows a simple environmental decision-making workflow:

```text
User Activities
        ↓
Carbon Calculation
        ↓
Emission Analysis
        ↓
Hotspot Detection
        ↓
AI Recommendations
        ↓
Reduction Simulation
        ↓
Progress Tracking
```

CarbonWise AI not only calculates emissions but also helps users understand why emissions occur and how they can reduce them.

---

# ⚙️ How The Solution Works

## Step 1: User Inputs Activities

Users enter:

- Daily transportation
- Electricity consumption
- Food preferences
- Shopping habits
- Waste generation

---

## Step 2: Carbon Calculation

The platform calculates estimated emissions using predefined emission factors.

Example:

```text
Transportation
+
Energy
+
Food
+
Lifestyle
=
Total Carbon Footprint
```

---

## Step 3: Emission Breakdown

The application identifies:

- Largest emission source
- Category percentages
- Environmental hotspots

---

## Step 4: AI Analysis

AI Coach evaluates:

- User behavior
- Carbon profile
- Sustainability opportunities

And generates:

- Personalized suggestions
- Reduction strategies
- Awareness insights

---

## Step 5: Simulator

Users can test lifestyle changes and instantly view:

- Potential carbon savings
- Emission reduction percentages
- Improved sustainability scores

---

## Step 6: Progress Monitoring

Users monitor:

- Historical emissions
- Weekly improvements
- Long-term sustainability progress

---

# 📌 Assumptions Made

The following assumptions were made during development:

- User-provided data is assumed to be accurate.
- Carbon calculations are estimations based on publicly available emission factors.
- Results are intended for awareness purposes and not certified environmental audits.
- Sustainability scores are benchmark-based.
- Challenge completion is user-reported.
- Internet access is available for AI-powered features.
- Local storage is used for lightweight persistence in the MVP version.

---

# 🏗️ Architecture

```text
carbonwise-ai/
├── client/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── types/
│   ├── utils/
│   └── tests/
│
├── server/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   ├── validators/
│   ├── utils/
│   └── tests/
│
├── vercel.json
├── .env.example
└── README.md
```

---

# 🛠️ Technology Stack

## Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Recharts

## Backend

- Node.js
- Express.js
- TypeScript

## AI

- OpenRouter API

## Validation

- Zod

## Security

- Helmet
- CORS
- Rate Limiting

## Testing

- Vitest
- React Testing Library

---

# 📊 Sustainability Metrics

## Indian Benchmark

Average Carbon Footprint:

167 kg CO₂ / Month

## Global Benchmark

Average Carbon Footprint:

250 kg CO₂ / Month

## Sustainability Target

83 kg CO₂ / Month

---

# 🔒 Security Features

CarbonWise AI follows secure development practices:

- Input Validation using Zod
- Helmet Security Headers
- API Rate Limiting
- Environment Variables
- Error Handling Middleware
- Safe Data Processing
- Input Sanitization

---

# ⚡ Performance Optimizations

Implemented optimizations include:

- Route-Based Lazy Loading
- React Memoization
- Debounced Inputs
- Optimized Rendering
- Lightweight Styling
- Efficient Carbon Calculations

---

# 🧪 Testing

Automated testing covers:

- Carbon Calculation Engine
- Sustainability Score Logic
- Recommendation Engine
- API Validation
- UI Components

Testing Tools:

- Vitest
- React Testing Library

Run Tests:

```bash
npm run test
```

---

# ♿ Accessibility

CarbonWise AI follows accessibility best practices:

- Semantic HTML
- Keyboard Navigation
- ARIA Labels
- Screen Reader Support
- Responsive Design
- Mobile First Layout
- Accessible Form Validation

---

# 🏆 Evaluation Alignment

This project was designed to align with PromptWars evaluation criteria.

| Evaluation Area | Implementation |
|----------------|----------------|
| Code Quality | Modular TypeScript Architecture |
| Security | Helmet, Validation, Rate Limiting |
| Efficiency | Optimized Rendering & Lazy Loading |
| Testing | Automated Unit & Component Tests |
| Accessibility | ARIA Labels, Responsive Design |
| Problem Alignment | AI Carbon Awareness Platform |

---

# 🌐 API Endpoints

| Method | Endpoint | Description |
|----------|----------------------------|----------------------------|
| POST | /api/carbon/calculate | Calculate emissions |
| GET | /api/carbon/factors | Emission factors |
| POST | /api/coach/chat | AI Coach |
| GET | /api/challenges | Challenge list |
| POST | /api/challenges/update | Update progress |
| POST | /api/challenges/reset | Reset challenges |
| GET | /api/health | Health check |

---

# 🚀 Installation

Clone repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Run application:

```bash
npm run dev
```

---

# 🌐 Deployment

Frontend:

- Vercel

Backend:

- Render
- Railway
- Fly.io
- VPS

---

# 🔮 Future Roadmap

- User Authentication
- Cloud Synchronization
- Leaderboards
- Community Challenges
- PDF Reports
- Mobile Application
- Multi-Language Support
- Carbon Offset Marketplace
- ML-Based Carbon Predictions

---

# 🤝 Contributing

This repository was developed as a hackathon submission.

Community contributions may be considered in future versions.

---

# 📜 License

MIT License

---

# 👨‍💻 Author

### Harsh Nagpal

Cyber Security Enthusiast • Full Stack Developer • AI Innovator

GitHub: https://github.com/harsh160311

Made with ❤️ in India 🇮🇳

---

# 🌱 Building Technology for a Sustainable Future

CarbonWise AI © 2026#   C a r b o n - F o o t p r i n t  
 