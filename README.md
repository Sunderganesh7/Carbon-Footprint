

# 🌱 CarbonWise AI

## 📖 Overview

**CarbonWise AI** is a full-stack web application designed to help individuals understand and reduce their environmental impact.

The platform converts everyday activities such as transportation, energy consumption, food habits, and lifestyle choices into estimated carbon emissions.

It then analyzes the user's carbon profile and provides personalized sustainability recommendations through an AI-powered coach.

### Main Goal

> Help users understand where their emissions come from and provide practical ways to reduce them.

---

# 🎯 Problem Statement

Many people are aware of climate change but do not know how their daily activities contribute to carbon emissions.

CarbonWise AI addresses this problem by providing:

- Simple carbon footprint calculation
- Emission source analysis
- Personalized AI recommendations
- Carbon reduction simulations
- Sustainability progress tracking
- Gamified environmental challenges

---

# 🚀 Key Features

## 🌍 1. Carbon Footprint Calculator

Users can enter information related to:

- Transportation
- Electricity and energy consumption
- Food habits
- Lifestyle activities
- Shopping and consumption
- Waste generation

The system calculates an estimated carbon footprint using predefined emission factors.

---

## 📊 2. Interactive Carbon Dashboard

The dashboard provides a visual overview of the user's environmental impact.

It includes:

- Total carbon footprint
- Weekly analysis
- Monthly trends
- Emission breakdown
- Category-wise contribution
- Sustainability score
- Progress tracking

---

## 🤖 3. AI Sustainability Coach

CarbonWise AI includes an AI-powered sustainability coach.

The AI Coach can:

- Analyze carbon hotspots
- Explain emission sources
- Provide personalized recommendations
- Suggest sustainable lifestyle changes
- Answer environmental awareness questions
- Guide users toward emission reduction

---

## 🎯 4. Carbon Reduction Simulator

Users can experiment with different lifestyle choices before making real-world changes.

For example:

```text
Current Lifestyle
        ↓
Change Activity
        ↓
Recalculate Emissions
        ↓
Compare Results
        ↓
View Potential Reduction
````

Users can compare their current footprint with an optimized scenario and understand the potential impact of different choices.

---

## 🏆 5. Eco Challenges

CarbonWise AI includes gamified sustainability challenges such as:

* 🚆 Public Transport Challenge
* 🚗 No Car Day
* 🛍️ Green Shopping Challenge
* 💡 Save Electricity Challenge
* 🌱 Plant-Based Week
* 🚲 Bike Commute Challenge

These challenges encourage users to adopt sustainable habits.

---

## 📈 6. Progress Tracking

Users can track their environmental progress through:

* Historical carbon data
* Weekly improvements
* Monthly trends
* Emission reduction
* Sustainability score changes

---

## 🌱 7. Sustainability Score

The platform provides a sustainability score based on the user's carbon footprint and environmental activities.

Example score ranges:

|    Score | Category          |
| -------: | ----------------- |
|   80–100 | Excellent         |
|    60–79 | Good              |
|    40–59 | Average           |
| Below 40 | Needs Improvement |

---

# 🧠 System Workflow

```text
User Activities
       ↓
Carbon Calculation
       ↓
Emission Breakdown
       ↓
Carbon Hotspot Detection
       ↓
AI Sustainability Analysis
       ↓
Personalized Recommendations
       ↓
Reduction Simulation
       ↓
Progress Tracking
```

---

# ⚙️ How It Works

### Step 1 — User Input

The user provides information about daily activities such as:

* Transportation
* Electricity consumption
* Food preferences
* Shopping habits
* Waste generation

### Step 2 — Carbon Calculation

The system applies predefined emission factors to estimate carbon emissions.

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

### Step 3 — Emission Analysis

The application analyzes the calculated footprint and identifies major emission sources.

### Step 4 — AI Analysis

The AI Coach uses the user's carbon profile to generate personalized sustainability recommendations.

### Step 5 — Simulation

Users can modify their activities and compare their current footprint with an optimized scenario.

### Step 6 — Progress Tracking

The platform allows users to monitor their environmental progress over time.

---

# 🏗️ Architecture

```text
CarbonWise AI
│
├── Frontend
│   ├── Components
│   ├── Pages
│   ├── Hooks
│   ├── Services
│   ├── Types
│   └── Utilities
│
├── Backend
│   ├── Routes
│   ├── Services
│   ├── Middleware
│   ├── Validators
│   └── Utilities
│
├── AI Layer
│   └── OpenRouter API
│
└── Configuration
    ├── .env.example
    └── vercel.json
```

---

# 🛠️ Technology Stack

## Frontend

* React 18
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Recharts

## Backend

* Node.js
* Express.js
* TypeScript

## AI

* OpenRouter API

## Validation

* Zod

## Security

* Helmet
* CORS
* Rate Limiting
* Environment Variables
* Input Validation

## Testing

* Vitest
* React Testing Library

---

# 🔐 Security

CarbonWise AI follows secure development practices including:

* Input validation
* Zod schema validation
* Helmet security headers
* CORS configuration
* API rate limiting
* Environment variables
* Error handling
* Input sanitization

### Environment Variables

Sensitive API keys and credentials should be stored in `.env`.

**Never commit `.env` or API keys to GitHub.**

Use `.env.example` as the configuration template.

---

# ⚡ Performance

The application includes several performance optimizations:

* Route-based lazy loading
* React memoization
* Debounced inputs
* Optimized rendering
* Lightweight styling
* Efficient carbon calculations

---

# 🧪 Testing

The project includes automated tests for important application functionality.

Testing covers areas such as:

* Carbon calculation
* Sustainability scoring
* Recommendation logic
* API validation
* UI components

Run tests using:

```bash
npm run test
```

---

# 🌐 API Endpoints

| Method | Endpoint                 | Description                |
| ------ | ------------------------ | -------------------------- |
| POST   | `/api/carbon/calculate`  | Calculate carbon emissions |
| GET    | `/api/carbon/factors`    | Retrieve emission factors  |
| POST   | `/api/coach/chat`        | Communicate with AI Coach  |
| GET    | `/api/challenges`        | Retrieve eco challenges    |
| POST   | `/api/challenges/update` | Update challenge progress  |
| POST   | `/api/challenges/reset`  | Reset challenges           |
| GET    | `/api/health`            | Backend health check       |

---

# 📊 Sustainability Metrics

The application uses benchmark values to provide users with contextual information about their estimated footprint.

> Carbon footprint values are estimates intended for awareness and educational purposes and should not be treated as certified environmental measurements.

---

# 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Sunderganesh7/Carbon-Footprint.git
```

### 2. Navigate to the project

```bash
cd Carbon-Footprint
```

### 3. Install dependencies

Install the dependencies for the frontend and backend according to their respective package files.

### 4. Configure environment variables

Create a `.env` file based on:

```text
.env.example
```

Add the required API configuration.

### 5. Start the application

Use the project's configured development commands to start the frontend and backend.

---

# 🌐 Deployment

The application can be deployed using:

### Frontend

* Vercel

### Backend

* Render
* Railway
* VPS

---

# 🔮 Future Improvements

Planned improvements include:

* User authentication
* Cloud data synchronization
* Community challenges
* Leaderboards
* PDF sustainability reports
* Mobile application
* Multi-language support
* Carbon reduction recommendations using historical data
* ML-based carbon prediction
* Carbon offset integration

---

# 📌 Project Highlights

| Area            | Implementation                           |
| --------------- | ---------------------------------------- |
| Carbon Tracking | Activity-based emission calculation      |
| AI              | AI-powered Sustainability Coach          |
| Analytics       | Carbon trends and breakdown              |
| Simulation      | Lifestyle change comparison              |
| Gamification    | Eco challenges                           |
| Visualization   | Interactive dashboards                   |
| Security        | Validation, Helmet, CORS & rate limiting |
| Testing         | Automated frontend/backend testing       |

---

# 👨‍💻 Project

**CarbonWise AI**

AI-powered environmental awareness and carbon footprint platform.

**Repository:** `Carbon-Footprint`

Built with React, TypeScript, Node.js, and AI technologies.


