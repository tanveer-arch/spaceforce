<div align="center">
  <h1>🚑 HealthSense AI</h1>
  <h3>Autonomous Medical Triage & Emergency Dispatch System</h3>
</div>

## 🌟 Overview
HealthSense is a next-generation AI-powered healthcare application designed to bridge the gap between patient intake, clinical triage, and emergency response. It transforms static symptom tracking into a fully autonomous, empathetic, and dynamic agentic pipeline. 

During an emergency, HealthSense doesn't just record data—it **thinks, speaks, locates the nearest hospital, and dispatches an ambulance autonomously.**

## 🧠 Architecture: The 4-Agent Pipeline
HealthSense is powered by a multi-agent AI architecture utilizing **OpenRouter** and **NVIDIA NIM** models for robust, near-instantaneous reasoning.

1. **Intake Agent (Llama 3.1 8B):** A highly responsive NLP engine that extracts structured vitals and symptoms from casual user conversation.
2. **Clinical Triage Agent (Nemotron 3 Super 120B):** A massive reasoning engine that analyzes intake data against medical guidelines to determine severity (Standard, Priority, Emergency).
3. **Action Orchestrator (Node/Twilio/Google Maps):** When a critical emergency is detected, it automatically reverse-geocodes the user, finds the nearest hospital, and dispatches an ambulance via Twilio voice calls.
4. **Empathy Voice Agent (ElevenLabs):** Translates the triage output into a calming, human-like voice to reassure the patient while help is on the way.

## 🚀 Features
- **Real-Time Speech Interaction:** Powered by ElevenLabs for lifelike Text-to-Speech (TTS) and Speech-to-Text (STT).
- **Autonomous Emergency Dispatch:** Integrates with Twilio to physically call ambulances and send SMS alerts to Community Health Workers (CHWs).
- **Dynamic Geolocation:** Uses Google Maps Places API to locate the nearest real-world hospital instantly.
- **Explainable AI Engine:** Not a black box. The CDSS (Clinical Decision Support System) outputs confidence scores and medical rationales for every triage decision.

## 💻 Tech Stack
- **Frontend:** React, TypeScript, Vite
- **Backend Services:** Node.js (tsx)
- **AI Models:** Meta Llama 3.1 8B Instruct, NVIDIA Nemotron 3 Super 120B
- **Providers:** OpenRouter, ElevenLabs, Google Cloud (Maps), Twilio

## 🛠️ Setup & Installation

**1. Clone the repository and install dependencies:**
```bash
git clone https://github.com/tanveer-arch/spaceforce.git
cd spaceforce
npm install
```

**2. Configure Environment Variables:**
Copy the example environment file and fill in your keys:
```bash
cp .env.example .env
```

You will need the following API Keys:
- **OpenRouter (`NVIDIA_NLP_API_KEY` & `NVIDIA_CHAT_API_KEY`):** For the Llama and Nemotron agents.
- **ElevenLabs (`ELEVENLABS_API_KEY`):** For STT and TTS audio processing.
- **Google Maps (`GOOGLE_MAPS_API_KEY`):** (Must have the "Places API" enabled and billing active).
- **Twilio (`TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`):** For autonomous emergency dialing.

**3. Run the application:**
```bash
npm run dev
```

## 🏆 Hackathon Submission
This project was built under a "do or die" scenario. After pivoting from a static form-based UI based on mentor feedback, HealthSense was completely re-engineered into an autonomous, scalable solution focused on real-world impact.
