# DRISHTI-Air: Distributed Real-time Ingestion, Sensing & Hazard Telemetry Intelligence

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://python.org)
[![Google ADK](https://img.shields.io/badge/Google%20ADK-2.0%20Web-emerald.svg)](https://cloud.google.com)
[![Google GenAI](https://img.shields.io/badge/Gemini-3.8%20Flash%20%2F%202.5%20Flash-indigo.svg)](https://ai.google.dev)
[![Google TimesFM](https://img.shields.io/badge/TimesFM-2.0%20500M-cyan.svg)](https://github.com/google-research/timesfm)
[![React TypeScript](https://img.shields.io/badge/React%2019-TypeScript%20%2B%20Tailwind-sky.svg)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-Apache%202.0-orange.svg)](LICENSE)

A Decentralized, distributed multi-agent environmental intelligence and forecasting platform built with **Google Agent Development Kit (ADK 2.0 Web)**, the modern **Google GenAI SDK (`@google/genai`)**, and **Google Research TimesFM 2.0 Foundation Models**.

Live Web-App link: [https://drishti-air-distributed-real-time-ingestion-sensi.ai.studio](https://drishti-air-distributed-real-time-ingestion-sensi.ai.studio)

---

## 📑 Table of Contents
1. [System Architecture Overview](#-system-architecture-overview)
2. [Source Code & Script Structure](#-source-code--script-structure)
3. [Prerequisites & Installation](#-prerequisites--installation)
4. [How to Run the Web Application](#-how-to-run-the-web-application)
5. [How to Run Using the Python Scripts](#-how-to-run-using-the-python-scripts)
6. [Detailed Script Functionality](#-detailed-script-functionality)
7. [Multi-Agent Integration Test Suite](#-multi-agent-integration-test-suite)
8. [API Reference](#-api-reference)
9. [Deployment & Publishing Guide](#-deployment--publishing-guide)

---

## 🏛️ System Architecture Overview

DRISHTI-Air is structured across **4 collaborative tiers**:

```
┌──────────────────────────────────────────────────────────────────────────┐
│              TIER 4: APPLICATIONS & USER INTERFACE                      │
│  Interactive Map & Dashboard  │  Chat Interface (AeroQuery)              │
│  Reports & Automated Alerts   │  REST APIs & Python ADK Tools            │
└──────────────────────────────────────────────────────────────────────────┘
                                    ▲
┌──────────────────────────────────────────────────────────────────────────┐
│              TIER 3: AUTONOMOUS AGENTIC SYSTEM                           │
│  1. National Macro-Ingestion & CAAQMS Orchestrator (ADK 2.0 Engine)      │
│  2. Google TimesFM 2.0 Foundation Model Forecaster (168h -> 24h Horizon) │
│  3. Bengaluru Citizen Hyperlocal Spatial Agent (IDW Interpolation)       │
│  4. Multimodal Hazard Verification Agent (Gemini Vision API)             │
│  5. AeroQuery Conversational & Dynamic Visual Analytics Agent            │
└──────────────────────────────────────────────────────────────────────────┘
                                    ▲
┌──────────────────────────────────────────────────────────────────────────┐
│              TIER 2: SENSOR FUSION & DATA PROCESSING                     │
│  • Automated 15-second polling synchronization                           │
│  • Inverse Distance Weighting (IDW) geospatial interpolation             │
│  • Cleaning, outlier rejection & sensor drift compensation               │
│  • 168-hour rolling feature matrices & weather covariate matching        │
└──────────────────────────────────────────────────────────────────────────┘
                                    ▲
┌──────────────────────────────────────────────────────────────────────────┐
│              TIER 1: MULTI-SOURCE DATA INGESTION                         │
│  • 169+ CAAQMS continuous ground monitoring stations (32 States & UTs)   │
│  • 6 Criteria Pollutants: PM2.5, PM10, NO2, SO2, CO, O3                  │
│  • 8 Meteorological Feeds: Temp, Humidity, Wind Spd/Dir, Pressure, Rad  │
│  • Earth Observation: Sentinel-5P TROPOMI & MODIS AOD (550nm)            │
│  • Citizen Multimodal Uploads: Geo-tagged images/videos & sensory notes   │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 📂 Source Code & Script Structure

The repository is modularly organized for enterprise deployment:

```
├── run_app.py                 # ⭐ Master unified CLI runner & orchestrator
├── cpcb_adk_agent.py          # National CAAQMS telemetry ingestion agent (ADK 2.0 Web)
├── citizen_adk_agent.py       # Multimodal hazard verification agent (Gemini Vision)
├── sktime_forecast.py         # Google TimesFM 2.0 zero-shot 24h forecasting pipeline
├── requirements.txt           # Python ecosystem dependencies
├── server.ts                  # High-performance Node.js / Express backend proxy
├── package.json               # Node.js dependencies and build scripts
├── index.html                 # Web application entry point
├── src/
│   ├── App.tsx                # Master React state router & layout
│   ├── components/
│   │   ├── AqiGeoMap.tsx              # All-India CAAQMS GIS Map (Google Maps Platform)
│   │   ├── BengaluruCitizenMap.tsx    # Pinpoint street interpolation & camera uploads
│   │   ├── AirQualityChatbot.tsx      # AeroQuery conversational visual analyst
│   │   ├── AqiDataTable.tsx           # Standardized multi-mode telemetry table
│   │   ├── AgentArchitectureView.tsx  # Multi-Agent Workflow, Directory & Topology
│   │   ├── SystemArchitectureDiagram.tsx # Interactive 4-tier architecture visualizer
│   │   ├── PythonCodeViewer.tsx       # Embedded source code & execution guide inspector
│   │   ├── ForecastModal.tsx          # TimesFM 24h forecast charts with confidence cones
│   │   └── KpiMetrics.tsx             # Real-time national KPI metric cards
│   └── types.ts               # Shared TypeScript domain interfaces
```

---

## ⚙️ Prerequisites & Installation

### 1. Python Environment Setup (Python 3.10+)
Create a virtual environment and install the required dependencies:

```bash
# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate       # On Linux/macOS
# .\venv\Scripts\activate      # On Windows

# Install Python dependencies
pip install -r requirements.txt
```

### 2. Node.js Environment Setup (Node.js 18+)
```bash
npm install
```

### 3. Environment Variables (Optional)
Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```
Key configuration parameters:
- `GEMINI_API_KEY`: API key from [Google AI Studio](https://aistudio.google.com/) for Gemini models.
- `VITE_GOOGLE_MAPS_API_KEY`: Google Maps JavaScript API key for interactive GIS maps.
- `PORT`: Port for the backend server (defaults to `3000` for web, `8080` for standalone ADK agents).

---

## 🌐 How to Run the Web Application

### Method 1: Using the Unified Python Launcher (Recommended)
You can launch the complete full-stack web application directly through Python:
```bash
python run_app.py --web
```
Or simply:
```bash
python run_app.py
```
This automatically initiates the Node.js/Express server with Vite development middleware and opens the web application at:
👉 **`http://localhost:3000`**

### Method 2: Using npm Directly
```bash
npm run dev
```

---

## 🐍 How to Run Using the Python Scripts

Each Python script is completely self-contained with built-in zero-dependency fallbacks and interactive CLI flags:

### 1. Unified Multi-Agent Runner (`run_app.py`)
```bash
# Check dependencies and system runtime
python run_app.py --check-env

# Run automated integration tests across all multi-agent modules
python run_app.py --test-all

# Run the National Ingestion Agent in ADK Web server mode
python run_app.py --ingest --port 8080

# Run the Citizen Multimodal Verification Agent in ADK Web server mode
python run_app.py --citizen --port 8080

# Run the Google TimesFM 24h forecasting pipeline demonstration
python run_app.py --forecast
```

### 2. Standalone National Ingestion Agent (`cpcb_adk_agent.py`)
```bash
# Print a single-cycle nationwide telemetry snapshot table
python cpcb_adk_agent.py --demo

# Start the ADK 2.0 Web reactive server with 15-second background auto-polling
python cpcb_adk_agent.py --serve --port 8080
```
Open **`http://localhost:8080`** in your browser to view the reactive ADK Web dashboard.

### 3. Standalone Citizen Verification Agent (`citizen_adk_agent.py`)
```bash
# Run automated test suite: verifies genuine combustion vs false alarm trees
python citizen_adk_agent.py --demo

# Start interactive ADK Web incident upload dashboard
python citizen_adk_agent.py --serve --port 8080
```

### 4. Standalone TimesFM 2.0 Forecaster (`sktime_forecast.py`)
```bash
# Run 24-hour horizon point predictions, confidence intervals, and evaluation metrics
python sktime_forecast.py
```

---

## 🔍 Detailed Script Functionality

### 1. `run_app.py` (Master Orchestrator)
- **Role**: Unified launcher managing both Node.js full-stack processes and standalone Python agent workers.
- **Capabilities**:
  - Subprocess lifecycle management with graceful `Ctrl+C` teardown.
  - Automated integration testing ensuring telemetry schemas, Gemini Vision prompts, and TimesFM predictions comply with production requirements.
  - Automatic fallback if optional scientific libraries (`pandas`, `sktime`) are not yet installed.

### 2. `cpcb_adk_agent.py` (National Ingestion Agent)
- **Role**: Continuously ingests and cleans ambient ground telemetry across 169+ CAAQMS stations in 32 Indian States and Union Territories.
- **Mathematical Formula**:
  Computes individual sub-indices ($I_p$) via piecewise linear interpolation:
  $$I_p = \frac{I_{hi} - I_{lo}}{B_{hi} - B_{lo}} \times (C_p - B_{lo}) + I_{lo}$$
  The overall National AQI is determined by the maximum sub-index:
  $$\text{AQI} = \max(I_{\text{PM2.5}}, I_{\text{PM10}}, I_{\text{NO2}}, I_{\text{SO2}}, I_{\text{CO}}, I_{\text{O3}})$$
- **Features**:
  - Consolidates 8 meteorological covariates per station (Temperature, Relative Humidity, Wind Speed, Wind Direction, Barometric Pressure, Solar Radiation, Rainfall, Satellite AOD).
  - Background 15-second scheduler timer in Google ADK 2.0 Web.

### 3. `citizen_adk_agent.py` (Multimodal Verification Agent)
- **Role**: Validates citizen ground photographs, videos, and olfactory reports before triggering municipal response teams.
- **Key Discriminators**:
  - **False Alarm Filter**: Identifies roadside shade trees, foliage, and vegetation as non-hazards (Chlorophyll reflectance, zero combustion).
  - **Small-Time Activity Containment**: Correctly classifies roadside tea stalls and small cooking stoves as localized micro-activities lacking buoyancy to spread.
  - **Critical Hazard Detection**: Flags open municipal waste combustion, industrial chemical plumes, and construction dust storms with blast radius modeling.
- **Dispersion Modeling**:
  Estimates affected downwind area ($A$) based on wind velocity vector ($v_w$) and atmospheric thermal stability class ($S$):
  $$A = \pi \cdot r^2 \cdot \left(1 + \frac{v_w}{v_{\text{ref}}}\right)$$

### 4. `sktime_forecast.py` (Google TimesFM 2.0 Forecaster)
- **Role**: Zero-shot foundational time-series forecasting engine.
- **Architecture**:
  - Context Window: **168 hours** (1 full rolling week of hourly historical telemetry).
  - Forecast Horizon: **24 hours ahead**.
  - Conditioning: Exogenous micro-meteorological vectors (boundary layer ventilation factor, nocturnal inversion penalty, wind velocity dilution).
  - Error Diagnostics: Mean Absolute Error (MAE), Root Mean Squared Error (RMSE), and symmetric Mean Absolute Percentage Error (sMAPE).

---

## 🧪 Multi-Agent Integration Test Suite

To verify system integrity before deploying or publishing, run:
```bash
python run_app.py --test-all
```
Expected output:
```text
================================================================================
[*] Running DRISHTI-Air Multi-Agent Integration Test Suite...

[TEST 1/3] Testing Ingestion Pipeline & Sub-Index Calculation...
  ✓ Ingestion Test Passed: 22 CAAQMS stations processed (Avg AQI: 246)

[TEST 2/3] Testing Multimodal Citizen Hazard Verification...
  ✓ False Alarm Rejection Passed: Classified as Benign Natural Foliage / Safe Scene (Safe)
  ✓ Hazard Detection Passed: Classified as Open Municipal Solid Waste & Plastic Combustion (Hazard Level: CRITICAL)

[TEST 3/3] Testing 24h TimesFM Forecasting...
  ✓ TimesFM Forecasting Passed: 24h horizon trajectory generated (sMAPE: 12.6%)

================================================================================
  ✓ ALL MULTI-AGENT INTEGRATION TESTS PASSED (3/3 MODULES READY)
================================================================================
```

---

## 📡 API Reference

When running the full-stack web application (`python run_app.py --web`), the Express server provides the following endpoints:

| Endpoint | Method | Description |
|---|---|---|
| `/api/aqi/realtime` | `GET` | Fetches normalized telemetry across 169+ stations and national KPIs |
| `/api/forecast` | `POST` | Generates 24h TimesFM foundation forecasts for any station and pollutant |
| `/api/bengaluru/stations` | `GET` | Returns high-density Karnataka / Bengaluru CAAQMS station cluster |
| `/api/bengaluru/interpolate` | `POST` | Executes Inverse Distance Weighting (IDW) for any street latitude/longitude |
| `/api/citizen/verify` | `POST` | Submits image/video for Gemini Multimodal hazard verification |
| `/api/citizen/reports` | `GET` | Retrieves recent verified citizen incident reports |
| `/api/chatbot/query` | `POST` | AeroQuery conversational telemetry queries and dynamic visual plotting configs |
| `/api/python-source` | `GET` | Serves Python script source code and documentation to the in-app inspector |

---

## 🚀 Deployment & Publishing Guide

### Production Build
To create a production-optimized bundle:
```bash
npm run build
npm start
```

### Docker Deployment
You can package the application into a container:
```dockerfile
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t drishti-air .
docker run -p 3000:3000 -e GEMINI_API_KEY="your-key" drishti-air
```

---

## 📜 License
Distributed under the **Apache 2.0 License**. See `LICENSE` for more information.
