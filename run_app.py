#!/usr/bin/env python3
"""
DRISHTI-Air Unified Launcher & Multi-Agent Orchestrator
======================================================
This script provides a unified interface to run:
1. The Full-Stack Web Application (Node.js/Express + React TypeScript GIS UI)
2. The National Telemetry & CAAQMS Ingestion Agent (cpcb_adk_agent.py)
3. The Citizen Telemetry & Multimodal Verification Agent (citizen_adk_agent.py)
4. The Google TimesFM 2.0 Foundation Model Forecaster (sktime_forecast.py)
5. Comprehensive Multi-Agent Pipeline Verification Suite

Usage:
  python run_app.py              # Launch the Full-Stack Web Application
  python run_app.py --web        # Launch the Full-Stack Web Application
  python run_app.py --ingest     # Run the National Ingestion Agent (15s cycle)
  python run_app.py --citizen    # Run the Multimodal Verification Agent
  python run_app.py --forecast   # Run the TimesFM 24h Forecasting Pipeline
  python run_app.py --test-all   # Run automated integration tests across all agents
  python run_app.py --check-env  # Validate system environment & dependencies
"""

from __future__ import annotations

import argparse
import os
import shutil
import subprocess
import sys
import time


def print_banner():
    print("""
================================================================================
   ____  ____  _____ ____  _   _ _____ ___      _    _     
  |  _ \|  _ \|_   _/ ___|| | | |_   _|_ _|    / \  (_)_ __ 
  | | | | |_) | | | \___ \| |_| | | |  | |    / _ \ | | '__|
  | |_| |  _ <  | |  ___) |  _  | | |  | |   / ___ \| | |   
  |____/|_| \_\ |_| |____/|_| |_| |_| |___| /_/   \_\_|_|   
                                                            
  Distributed Real-time Ingestion, Sensing & Hazard Telemetry Intelligence
  Autonomous Multi-Agent System (Google ADK 2.0 + Gemini + TimesFM 2.0)
================================================================================
""")


def check_environment():
    """Validates installed dependencies and system prerequisites."""
    print("[1/3] Checking Python runtime and libraries...")
    print(f"  • Python Version: {sys.version.split()[0]}")

    deps = [
        ("pydantic", "Pydantic v2 (Strict Schema Validation)"),
        ("google.genai", "Google GenAI SDK (Gemini Models)"),
        ("google.adk", "Google Agent Development Kit 2.0"),
        ("pandas", "Pandas DataFrames"),
        ("sktime", "sktime Time-Series Framework"),
        ("dotenv", "python-dotenv"),
    ]

    for mod, desc in deps:
        try:
            __import__(mod)
            print(f"  ✓ {desc:<45} [Installed]")
        except ImportError:
            print(f"  ⚠ {desc:<45} [Optional / Fallback Active]")

    print("\n[2/3] Checking Node.js & npm runtime for Web App...")
    node_path = shutil.which("node")
    npm_path = shutil.which("npm")
    if node_path:
        node_v = subprocess.check_output([node_path, "-v"], text=True).strip()
        print(f"  ✓ Node.js Runtime: {node_path} ({node_v})")
    else:
        print("  ✗ Node.js not detected in PATH (Required for full-stack web app).")

    if npm_path:
        npm_v = subprocess.check_output([npm_path, "-v"], text=True).strip()
        print(f"  ✓ npm Package Manager: {npm_path} ({npm_v})")
    else:
        print("  ✗ npm not detected in PATH.")

    print("\n[3/3] Checking API Keys & Environment Variables...")
    gemini_key = os.getenv("GEMINI_API_KEY") or os.getenv("VITE_GEMINI_API_KEY")
    maps_key = os.getenv("VITE_GOOGLE_MAPS_API_KEY")

    if gemini_key:
        print("  ✓ GEMINI_API_KEY: Configured")
    else:
        print("  ℹ GEMINI_API_KEY: Not set (Agents will use deterministic high-fidelity fallbacks)")

    if maps_key:
        print("  ✓ VITE_GOOGLE_MAPS_API_KEY: Configured")
    else:
        print("  ℹ VITE_GOOGLE_MAPS_API_KEY: Using default demo map styling")


def run_web_app():
    """Starts the Node.js/Express + React TypeScript dev server."""
    print("[*] Launching DRISHTI-Air Full-Stack Web Application...")
    npm_cmd = shutil.which("npm")
    if not npm_cmd:
        print("[Error] npm command not found. Please install Node.js 18+ to run the web UI.")
        sys.exit(1)

    print("[*] Starting development server on http://localhost:3000")
    try:
        subprocess.run([npm_cmd, "run", "dev"], check=True)
    except KeyboardInterrupt:
        print("\n[*] Web application server stopped.")


def run_ingest_agent(port: int = 8080):
    """Executes the National Macro-Ingestion & CAAQMS Agent."""
    print(f"[*] Starting National Telemetry Ingestion Agent on port {port}...")
    import cpcb_adk_agent
    cpcb_adk_agent.app.run(host="0.0.0.0", port=port)


def run_citizen_agent(port: int = 8080):
    """Executes the Citizen Telemetry & Multimodal Verification Agent."""
    print(f"[*] Starting Citizen Verification Agent on port {port}...")
    import citizen_adk_agent
    citizen_adk_agent.app.run(host="0.0.0.0", port=port)


def run_forecasting_pipeline():
    """Executes the TimesFM 24h Foundation Model Forecasting Pipeline."""
    print("[*] Executing Google TimesFM 2.0 Zero-Shot Forecasting Pipeline...")
    import math
    import random
    import sktime_forecast

    # Generate 168-hour sample hourly historical sequence
    t_vals = [
        round(120.0 + 45.0 * math.sin(2 * math.pi * i / 24) + random.uniform(-10, 10), 1)
        for i in range(168)
    ]
    covariates = {
        "wind_speed_mps": 3.4,
        "temperature_c": 28.5,
        "relative_humidity_pct": 52.0,
        "barometric_pressure_hpa": 1012.0,
    }

    result = sktime_forecast.run_24h_station_forecast(
        t_vals,
        weather_covariates=covariates,
        target_name="PM2.5",
        horizon=24,
    )

    print("\n--- 24-Hour Foundation Model Forecast Output ---")
    print(f"Target Variable:  {result['target']}")
    print(f"Context Length:   {result['context_length']} hours (1 full rolling week)")
    print(f"Forecast Horizon: {result['horizon_hours']} hours ahead")
    print(f"Evaluation MAE:   {result['metrics']['timesfm_mae']} ug/m3")
    print(f"Evaluation RMSE:  {result['metrics']['timesfm_rmse']} ug/m3")
    print(f"Evaluation sMAPE: {result['metrics']['timesfm_smape_pct']}%")

    print("\nNext 12 Hours Point Trajectory:")
    for h, v in list(result["timesfm_forecast"].items())[:12]:
        print(f"  {h:<6} -> {v:.1f} ug/m3")


def run_all_tests():
    """Runs automated integration tests across all multi-agent modules."""
    print("[*] Running DRISHTI-Air Multi-Agent Integration Test Suite...")

    # Test 1: Ingestion
    print("\n[TEST 1/3] Testing Ingestion Pipeline & Sub-Index Calculation...")
    import cpcb_adk_agent
    stations = cpcb_adk_agent.fetch_realtime_aqi()
    kpis = cpcb_adk_agent.compute_national_kpis(stations)
    assert len(stations) > 0, "No stations ingested"
    assert "national_avg_aqi" in kpis, "KPI computation failed"
    print(f"  ✓ Ingestion Test Passed: {len(stations)} CAAQMS stations processed (Avg AQI: {kpis['national_avg_aqi']})")

    # Test 2: Citizen Agent
    print("\n[TEST 2/3] Testing Multimodal Citizen Hazard Verification...")
    import citizen_adk_agent
    agent = citizen_adk_agent.TelemetryVerificationAgent()
    # Test safe case
    safe_rep = agent.verify_telemetry(None, None, 12.97, 77.59, "Clean neighborhood street tree", "tree.jpg")
    s_dict = safe_rep.model_dump()
    assert s_dict["verification_status"]["is_genuine"] is False, "False positive on safe tree"
    print(f"  ✓ False Alarm Rejection Passed: Classified as {s_dict['verification_status']['event_type']} (Safe)")

    # Test hazard case
    haz_rep = agent.verify_telemetry(None, None, 12.93, 77.68, "Black smoke plume from burning dump", "smoke.jpg")
    h_dict = haz_rep.model_dump()
    assert h_dict["verification_status"]["is_genuine"] is True, "Failed to identify genuine hazard"
    print(f"  ✓ Hazard Detection Passed: Classified as {h_dict['verification_status']['event_type']} (Hazard Level: {h_dict['verification_status']['hazard_level']})")

    # Test 3: Forecasting
    print("\n[TEST 3/3] Testing 24h TimesFM Forecasting...")
    import sktime_forecast
    fc = sktime_forecast.run_24h_station_forecast([100.0] * 168, target_name="AQI", horizon=24)
    assert len(fc["timesfm_forecast"]) == 24, "Forecast horizon mismatch"
    print(f"  ✓ TimesFM Forecasting Passed: 24h horizon trajectory generated (sMAPE: {fc['metrics']['timesfm_smape_pct']}%)")

    print("\n================================================================================")
    print("  ✓ ALL MULTI-AGENT INTEGRATION TESTS PASSED (3/3 MODULES READY)")
    print("================================================================================")


def main():
    print_banner()
    parser = argparse.ArgumentParser(
        description="DRISHTI-Air Unified Launcher & Multi-Agent Orchestrator"
    )
    parser.add_argument("--web", action="store_true", help="Launch the full-stack web application (Vite + Express)")
    parser.add_argument("--ingest", action="store_true", help="Run the National Telemetry & CAAQMS Ingestion Agent")
    parser.add_argument("--citizen", action="store_true", help="Run the Citizen Telemetry & Multimodal Verification Agent")
    parser.add_argument("--forecast", action="store_true", help="Run the Google TimesFM 24h forecasting pipeline")
    parser.add_argument("--test-all", action="store_true", help="Run automated test suite across all modules")
    parser.add_argument("--check-env", action="store_true", help="Check dependencies and environment variables")
    parser.add_argument("--port", type=int, default=8080, help="Port for standalone ADK agents (default: 8080)")

    args = parser.parse_args()

    if args.check_env:
        check_environment()
    elif args.test_all:
        run_all_tests()
    elif args.ingest:
        run_ingest_agent(port=args.port)
    elif args.citizen:
        run_citizen_agent(port=args.port)
    elif args.forecast:
        run_forecasting_pipeline()
    else:
        # Default behavior: Launch full-stack web application
        run_web_app()


if __name__ == "__main__":
    main()
