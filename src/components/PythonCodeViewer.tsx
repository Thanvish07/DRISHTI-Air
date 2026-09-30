import React, { useState, useEffect } from 'react';
import { Copy, Check, Download, FileCode, Terminal, Sparkles, Compass, ShieldCheck, BookOpen, Play } from 'lucide-react';

export const PythonCodeViewer: React.FC = () => {
  const [activeFile, setActiveFile] = useState<'readme' | 'runApp' | 'citizen' | 'script' | 'forecast' | 'requirements'>('readme');
  const [readmeCode, setReadmeCode] = useState<string>('');
  const [runAppCode, setRunAppCode] = useState<string>('');
  const [scriptCode, setScriptCode] = useState<string>('');
  const [citizenCode, setCitizenCode] = useState<string>('');
  const [forecastCode, setForecastCode] = useState<string>('');
  const [reqsCode, setReqsCode] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/python-source')
      .then((res) => res.json())
      .then((data) => {
        setReadmeCode(data.readme || '');
        setRunAppCode(data.runApp || '');
        setScriptCode(data.script || '');
        setCitizenCode(data.citizenAgent || '');
        setForecastCode(data.sktimeForecast || '');
        setReqsCode(data.requirements || '');
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const getCurrentCode = (): string => {
    switch (activeFile) {
      case 'readme':
        return readmeCode;
      case 'runApp':
        return runAppCode;
      case 'script':
        return scriptCode;
      case 'citizen':
        return citizenCode;
      case 'forecast':
        return forecastCode;
      case 'requirements':
        return reqsCode;
    }
  };

  const getFilename = (): string => {
    switch (activeFile) {
      case 'readme':
        return 'README.md';
      case 'runApp':
        return 'run_app.py';
      case 'script':
        return 'cpcb_adk_agent.py';
      case 'citizen':
        return 'citizen_adk_agent.py';
      case 'forecast':
        return 'sktime_forecast.py';
      case 'requirements':
        return 'requirements.txt';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCurrentCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = getFilename();
    const content = getCurrentCode();
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Overview Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <FileCode className="w-5 h-5" />
            </span>
            <h2 className="text-base font-bold text-white">
              Production Python ADK Scripts &amp; Multi-Agent Architecture (ADK 2.0)
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Complete, self-contained Python scripts implementing the National CAAQMS Data Ingestion Tool,
            Citizen Telemetry &amp; Multimodal Verification Agent (with false-positive tree rejection &amp; spread dynamics),
            Google TimesFM 2.0 foundation model forecasting, and the unified launcher script.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 transition cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download {getFilename()}
          </button>
        </div>
      </div>

      {/* Code Editor / Viewer */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        {/* Tab Selector */}
        <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveFile('readme')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition flex items-center gap-1.5 ${
                activeFile === 'readme'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>README.md (Architecture &amp; Execution Guide)</span>
            </button>
            <button
              onClick={() => setActiveFile('runApp')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition flex items-center gap-1.5 ${
                activeFile === 'runApp'
                  ? 'bg-slate-800 text-purple-300 border border-purple-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Play className="w-3.5 h-3.5 text-purple-400" />
              <span>run_app.py (Unified CLI &amp; Web Runner)</span>
            </button>
            <button
              onClick={() => setActiveFile('citizen')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition flex items-center gap-1.5 ${
                activeFile === 'citizen'
                  ? 'bg-slate-800 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>citizen_adk_agent.py (Multimodal Verifier)</span>
            </button>
            <button
              onClick={() => setActiveFile('script')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
                activeFile === 'script'
                  ? 'bg-slate-800 text-sky-300 border border-sky-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              cpcb_adk_agent.py (National Ingestion)
            </button>
            <button
              onClick={() => setActiveFile('forecast')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
                activeFile === 'forecast'
                  ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              sktime_forecast.py (Google TimesFM)
            </button>
            <button
              onClick={() => setActiveFile('requirements')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
                activeFile === 'requirements'
                  ? 'bg-slate-800 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              requirements.txt
            </button>
          </div>

          <div className="text-[11px] font-mono text-slate-500">
            {activeFile === 'readme'
              ? 'Complete System Documentation • Step-by-Step Execution Guide'
              : activeFile === 'runApp'
              ? 'Unified Python & Web Application Launcher (Python 3.10+)'
              : activeFile === 'citizen'
              ? 'Python 3.10+ • Google ADK 2.0 • Gemini 3.8 Flash • Pydantic v2'
              : activeFile === 'script'
              ? 'Python 3.10+ • Google ADK 2.0 • 6 Pollutants NAQI Breakpoints'
              : activeFile === 'forecast'
              ? 'sktime • Google TimesFM 2.0 • 24h Horizon Forecast Cones'
              : 'Python PIP dependencies'}
          </div>
        </div>

        {/* Source Code Container */}
        <div className="p-4 font-mono text-xs text-slate-300 overflow-x-auto max-h-[580px] bg-slate-950 leading-relaxed select-text">
          {loading ? (
            <div className="text-slate-500 py-12 text-center">Loading documentation and source code...</div>
          ) : (
            <pre className="whitespace-pre">
              {getCurrentCode()}
            </pre>
          )}
        </div>

        {/* Terminal Run Instructions */}
        <div className="px-4 py-3 bg-slate-900/90 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>To run locally:</span>
            <code className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-emerald-400 font-mono">
              pip install -r requirements.txt &amp;&amp; python {getFilename()}
            </code>
          </div>
          <span className="text-slate-500 text-[11px]">
            Default Port: 8080 (Configurable via PORT env var)
          </span>
        </div>
      </div>

      {/* Architecture Highlights Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>1. Tree &amp; Nature False Alarm Elimination</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Multimodal optical verification rigorously distinguishes natural tree foliage, garden greenery, and benign water vapor
            from toxic combustion. Accurately sets delta pollutants to 0.0 and blast radius to 0m.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4 text-indigo-400" />
            <span>2. Atmospheric Spread Modeling</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Distinguishes non-spreading small-time micro sources (tea stall kettle steam, domestic incense) from large continuous plumes
            (open refuse/plastic combustion, industrial stacks, demolition dust storms).
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>3. ADK 2.0 Web &amp; Downstream Persistence</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Strict Pydantic structured schemas (<code className="text-slate-200 font-mono font-semibold">CitizenTelemetryReport</code>)
            persisting verified hazard payloads to JSON for downstream spatial mapping and Hazmat dispatch agents.
          </p>
        </div>
      </div>
    </div>
  );
};
