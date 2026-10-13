<div align="center">

# 🧬 Altrix Labs — AI-Powered Personal Health Copilot

### *Turning complex health data into meaningful, actionable insights*

[![Vercel Deploy](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js)](https://threejs.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

**Inspired by [ClyHealth Healthcare Dashboard Design by Fuselab Creative](https://fuselabcreative.com/our-projects/clyhealth-dashboard-design/)**

</div>

---

## ✨ Overview

**Altrix Labs Health Copilot** is a premium, fully animated AI-powered healthcare dashboard built for Altrix Labs' hackathon challenge:

> *"Build the future of personalized healthcare with AI."*

It helps individuals **understand, organize, and manage** their healthcare journey through intelligent analysis of:
- 🩸 Medical records & EHR data
- 💊 Prescriptions & supplement protocols
- 🔬 Diagnostic lab reports & biomarker visualization
- 📈 Wellness telemetry (CGM, ECG, HRV, SpO2)
- 🧬 Genomic variants & epigenetic biological age clock

---

## 🎥 Key Features

### 🫀 Interactive 3D Digital Anatomy Twin
- Full-body WebGL holographic model built with **Three.js**
- Clickable organ hotspot nodes (Brain, Heart, Lungs, Liver, Kidneys, Spine)
- Real-time pulsing cardiac animation, breathing lung cycles, and vertical scan beam
- OrbitControls — drag to rotate, scroll to zoom
- System-layer filter (Cardiovascular, Neural, Metabolic, Respiratory)

### 🤖 AI Health Copilot Assistant
- Conversational chat drawer with streaming responses
- Medical record–grounded clinical analysis (not generic advice)
- Pre-built clinical prompt chips for quick queries
- Proactive longitudinal health insights
- Export one-click **Physician Consultation Brief (HIPAA-formatted)**

### 📊 Diagnostic Lab Hub
- 88+ biomarkers with visual range gauge bars
- Optimal zone highlight (green band), with your value pointer
- Trend delta vs. previous panel (↑/↓)
- AI Copilot breakdown for every marker

### 📋 Medical Records & EHR Timeline
- Filterable clinical timeline (Labs, Imaging, Genomics, Cardiology)
- Plain-English AI translation of each record
- Simulated PDF upload + OCR ingestion modal

### 💊 Prescription & Supplement Manager
- Visible **clinical reasoning** for every drug and supplement
- Drug–nutrient interaction audit (zero contraindications guard)
- Daily dose checkoff with adherence tracking
- Pharmacy refill countdown

### 🧬 Genomics & Biological Age Clock
- Biological age per organ system
- Whole Genome Sequencing (30x WGS) variant cards (FOXO3, APOE, MTHFR)
- Horvath epigenetic methylation clock results

### ⚡ Live Biosensor Telemetry
- Animated ECG canvas waveform (real-time)
- Heart rate, HRV, SpO2, CGM glucose — live micro-variation
- Synced wearable device badges (Apple Health, Oura Ring, Dexcom G7)

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19 |
| **3D Rendering** | Three.js (WebGL, OrbitControls, Points, ACES Filmic) |
| **Styling** | Tailwind CSS 3 + Custom Glassmorphism |
| **Build Tool** | Vite 8 |
| **Icons** | Lucide React |
| **Audio** | Web Audio API (synthesized UI sounds) |
| **Fonts** | Inter, Outfit, JetBrains Mono (Google Fonts) |
| **Deployment** | Vercel (static SPA) |

---

## 🛠️ Local Development

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/altrix-health-copilot.git
cd altrix-health-copilot

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys (optional for demo mode)

# 4. Start the dev server
npm run dev

# 5. Open in browser
# Local:   http://localhost:3000
# Network: shown in terminal after --host flag
```

### Share on Local Network
```bash
npm run dev -- --host
# Provides a Network URL for devices on the same Wi-Fi
```

---

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
# Output in /dist — ready for any static host
```

### Deploy to Vercel (Recommended)

#### Option 1: Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

#### Option 2: Vercel Dashboard
1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repo
4. Framework preset: **Vite**
5. Build command: `npm run build`
6. Output directory: `dist`
7. Add environment variables from `.env.example`
8. Click **Deploy** 🚀

---

## 🔐 Environment Variables

Copy `.env.example` → `.env.local` and fill in your values:

| Variable | Description | Required |
|---|---|---|
| `VITE_OPENAI_API_KEY` | OpenAI key for real AI responses | Optional (demo mode works without) |
| `VITE_LLM_BASE_URL` | Custom LLM endpoint | Optional |
| `VITE_EPIC_CLIENT_ID` | Epic MyChart FHIR OAuth | Optional |
| `VITE_APP_ENV` | `development` or `production` | Optional |

> ⚠️ **Never commit `.env.local`** — it is git-ignored by default.

---

## 📁 Project Structure

```
altrix-health-copilot/
├── src/
│   ├── components/
│   │   ├── ThreeDHumanCanvas.jsx   # Three.js WebGL anatomy engine
│   │   ├── VitalsHUD.jsx           # Live ECG + biometric cards
│   │   ├── AICopilotDrawer.jsx     # Chat assistant with clinical AI
│   │   ├── OrganDetailModal.jsx    # Organ inspection HUD
│   │   ├── MedicalRecordsTimeline.jsx
│   │   ├── DiagnosticLabHub.jsx    # 88-marker biomarker hub
│   │   ├── PrescriptionManager.jsx
│   │   ├── GenomicsLongevityView.jsx
│   │   ├── UploadRecordModal.jsx   # OCR record ingestion
│   │   ├── ClinicalReportModal.jsx # HIPAA doctor brief
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   ├── data/
│   │   └── patientData.js          # Clinical demo dataset
│   ├── utils/
│   │   └── audio.js                # Web Audio UI sounds
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example                    # Template — copy to .env.local
├── .env.local                      # Your secrets (git-ignored)
├── .gitignore
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🏆 Hackathon Context

**Challenge:** Altrix Labs — *"AI-Powered Personal Health Copilot"*

**Problem Statement:** Design and develop an AI-powered Personal Health Copilot that helps individuals understand, organize, and manage their healthcare journey through intelligent analysis of medical records, prescriptions, diagnostic reports, and wellness data.

**Solution Approach:**
- Layered 3-level dashboard architecture (critical data first)
- Proprietary 3D holographic digital twin inspired by ClyHealth/Fuselab
- Conversational AI grounded in patient-specific clinical records
- Actionable supplement and medication personalization with visible clinical reasoning

---

## 🙏 Credits & Inspiration

- **Design Reference:** [ClyHealth Healthcare Dashboard by Fuselab Creative](https://fuselabcreative.com/our-projects/clyhealth-dashboard-design/)
- **Challenge Organizer:** Altrix Labs
- **3D Engine:** Three.js community
- **Icons:** Lucide React

---

<div align="center">

Built with ❤️ for the **Altrix Labs AI Health Copilot Hackathon**

</div>
