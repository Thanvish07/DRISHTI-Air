import React, { useState, useRef, useEffect } from 'react';
import { PlotlyChart } from './PlotlyChart';
import {
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  User,
  LineChart,
  RefreshCw,
  HelpCircle,
  Maximize2,
  Minimize2,
  Trash2,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  timestamp: string;
  text: string;
  plotConfig?: any;
}

export interface AirQualityChatbotProps {
  mode: 'main_map' | 'bengaluru_citizen';
  contextData: any;
  title?: string;
  subtitle?: string;
}

// Clean text renderer that formats text properly without exposing literal asterisks
const renderMessageContent = (text: string) => {
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    // Parse bold segments **bold** or *italic* without showing raw asterisks
    const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
    return (
      <div key={idx} className={line.trim() === '' ? 'h-2' : 'leading-relaxed'}>
        {parts.map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={pIdx} className="font-bold text-white">
                {part.slice(2, -2)}
              </strong>
            );
          }
          if (part.startsWith('*') && part.endsWith('*')) {
            return (
              <span key={pIdx} className="text-slate-300">
                {part.slice(1, -1)}
              </span>
            );
          }
          return <span key={pIdx}>{part.replace(/\*/g, '')}</span>;
        })}
      </div>
    );
  });
};

export const AirQualityChatbot: React.FC<AirQualityChatbotProps> = ({
  mode,
  contextData,
  title,
  subtitle,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef<boolean>(true);

  // Initial welcome message based on mode (normal clean text without special characters like *)
  useEffect(() => {
    if (messages.length === 0) {
      if (mode === 'bengaluru_citizen') {
        setMessages([
          {
            id: 'welcome_blr',
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: `Welcome to Bengaluru Pinpoint Telemetry and Weather Intelligence.\n\nI provide live environmental analysis, pollutant values, and weather diagnostics for your selected pinpoint location on the map.\n\nKey Capabilities:\n- Criteria Pollutants: Real-time values for PM2.5, PM10, NO2, SO2, CO, and O3.\n- Weather Parameters: Wind speed, wind direction, temperature, humidity, and barometric pressure.\n- National Standards: Benchmark compliance against National Ambient Air Quality Standards (NAAQS 24-hour limits).\n- Dynamic Plotting: Interactive line graphs for 24-hour trends, NAAQS benchmarks, dual-pollutant correlations, and National AQI hazard bands.\n\nClick anywhere on the Bengaluru map to update the pinpoint coordinates, or ask an environmental question below to begin.`,
          },
        ]);
      } else {
        setMessages([
          {
            id: 'welcome_main',
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: `Welcome to National Air Quality and Environmental Telemetry Intelligence.\nContinuous Ambient Air Quality Monitoring Stations (CAAQMS) Network.\n\nI provide live environmental analytics, regulatory benchmark assessments, and weather data across India's ground monitoring stations.\n\nKey Capabilities:\n- Regional and Station Data: Station readings, citywide averages, and pollution hotspots across all states.\n- Criteria Pollutants and AQI: Real-time values for PM2.5, PM10, NO2, SO2, CO, and O3 with official NAQI categories.\n- Meteorological Factors: Atmospheric ventilation, temperature, humidity, and wind dispersion dynamics.\n- Dynamic Plotting: Interactive line graphs for overall AQI trends, NAAQS benchmarks, dual-pollutant correlations, multi-station comparisons, and inter-city comparisons.\n\nPlease enter your query or choose an inquiry option below to begin.`,
          },
        ]);
      }
    }
  }, [mode, contextData]);

  // Scroll inner chat to bottom only when user sends message or gets a response, NEVER scrolling the window
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chatbot/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          mode,
          context: contextData,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to get response`);
      const data = await res.json();

      const botMsg: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: data.answer || 'Analysis complete.',
        plotConfig: data.should_plot ? data.plot_config : undefined,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 9),
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `⚠️ **Error communicating with intelligence engine**: ${err.message || 'Please check your connection and retry.'}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([]);
  };

  const samplePrompts =
    mode === 'bengaluru_citizen'
      ? [
          'Plot pinpoint AQI trend with CPCB hazard bands',
          'Plot PM2.5 concentration against NAAQS 24h benchmark',
          'Plot dual correlation: PM2.5 vs NO2',
          'How does wind speed and direction affect dispersion here?',
          'What are the 6 criteria pollutant values at this pinpoint?',
        ]
      : [
          'Plot overall AQI trend with official CPCB hazard color bands',
          'Plot PM2.5 concentration against NAAQS 24h benchmark',
          'Plot dual-pollutant correlation PM2.5 vs NO2',
          'Compare Anand Vihar vs RK Puram stations',
          'Compare Delhi vs Mumbai vs Bengaluru AQI',
          'How is meteorological humidity affecting PM10 particulate levels?',
        ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden mt-6">
      {/* Chatbot Header */}
      <div className="px-5 py-3.5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-950/40">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">
                {title ||
                  (mode === 'bengaluru_citizen'
                    ? 'AeroQuery: Bengaluru Pinpoint Telemetry Analyst'
                    : 'AeroQuery: National Telemetry & Environmental Analyst')}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>AeroQuery Dynamic Visualizer</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {subtitle ||
                (mode === 'bengaluru_citizen'
                  ? 'Ask anything about criteria pollutants & weather for this street, or request dynamic line charts'
                  : 'Grounded intelligence across India CAAQMS stations, NAAQS standards & meteorological physics')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleClearHistory}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <>
          {/* Messages Scroll Area */}
          <div ref={messagesContainerRef} className="p-4 space-y-4 max-h-[460px] overflow-y-auto bg-slate-950/60 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs shadow-md leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-tr-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-1 pb-1 border-b border-white/10 text-[10px] text-slate-400">
                    <span className="font-semibold text-slate-300">
                      {msg.sender === 'user' ? 'You' : 'AeroQuery Telemetry Intelligence'}
                    </span>
                    <span className="font-mono">{msg.timestamp}</span>
                  </div>

                  <div className="text-xs font-sans space-y-1">
                    {renderMessageContent(msg.text)}
                  </div>

                  {/* Dynamic Plotly Line Graph Rendering */}
                  {msg.plotConfig && msg.plotConfig.traces && (
                    <div className="mt-3.5 p-3 rounded-xl bg-slate-950/90 border border-slate-800 shadow-inner space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-bold text-cyan-300 border-b border-slate-800/80 pb-1.5">
                        <span className="flex items-center gap-1.5">
                          <LineChart className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{msg.plotConfig.title || 'Dynamic Telemetry Analytics Chart'}</span>
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 font-normal">
                          AeroQuery Visual Engine
                        </span>
                      </div>

                      <PlotlyChart
                        data={msg.plotConfig.traces}
                        layout={{
                          title: {
                            text: msg.plotConfig.title || '',
                            font: { color: '#f8fafc', size: 12 },
                          },
                          xaxis: {
                            title: { text: msg.plotConfig.x_title || 'Timeline' },
                          },
                          yaxis: {
                            title: { text: msg.plotConfig.y_title || 'Value' },
                          },
                          shapes: msg.plotConfig.shapes || [],
                          ...msg.plotConfig.layout_extras,
                        }}
                        className="w-full h-72"
                      />
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center text-white shrink-0 mt-0.5 animate-pulse">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none p-3.5 text-xs text-slate-400 flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                  <span>Synthesizing air quality &amp; plotting telemetry...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-4 py-2.5 bg-slate-900/90 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
            <span className="text-[10.5px] font-semibold uppercase text-slate-500 whitespace-nowrap flex items-center gap-1 shrink-0">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Try:</span>
            </span>
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 text-[11px] whitespace-nowrap transition cursor-pointer shrink-0 disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-900 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  mode === 'bengaluru_citizen'
                    ? 'Ask about this pinpoint (e.g., "Plot PM2.5 with NAAQS benchmark" or "What is current weather?")...'
                    : 'Ask about any station, city, or state (e.g., "Compare Delhi vs Mumbai" or "Plot PM2.5 vs NO2")...'
                }
                disabled={isLoading}
                className="flex-1 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition font-sans"
              />
              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-950/50 flex items-center gap-1.5 transition shrink-0 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ask AI</span>
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
