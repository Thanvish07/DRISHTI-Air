import React, { useState } from 'react';
import { AgentLogEntry, AgentOrchestrationResult } from '../types';
import { Terminal, Send, CheckCircle2, Cpu, Wrench, RefreshCw, Sparkles, Filter } from 'lucide-react';

interface AgentConsoleProps {
  logs: AgentLogEntry[];
  orchestrationResult: AgentOrchestrationResult | null;
  onAskAgent: (query: string) => void;
  isQuerying: boolean;
  onClearLogs: () => void;
}

export const AgentConsole: React.FC<AgentConsoleProps> = ({
  logs,
  orchestrationResult,
  onAskAgent,
  isQuerying,
  onClearLogs,
}) => {
  const [queryInput, setQueryInput] = useState('');
  const [logFilter, setLogFilter] = useState<'ALL' | 'TOOL_CALL' | 'DATA_NORMALIZATION' | 'LLM_REASONING'>('ALL');

  const filteredLogs = logs.filter((log) => {
    if (logFilter === 'ALL') return true;
    return log.type === logFilter;
  });

  const handleSendQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim() || isQuerying) return;
    onAskAgent(queryInput.trim());
    setQueryInput('');
  };

  const getLogBadge = (type: AgentLogEntry['type']) => {
    switch (type) {
      case 'TOOL_CALL':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">TOOL_CALL</span>;
      case 'TOOL_RESULT':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">TOOL_RESULT</span>;
      case 'DATA_NORMALIZATION':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/30">DATA_NORM</span>;
      case 'LLM_REASONING':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30">LLM_REASONING</span>;
      case 'UI_UPDATE':
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/30">UI_SYNC</span>;
      default:
        return <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400">TIMER</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Agent Telemetry & Status Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-white">Google ADK 2.0 Agentic Telemetry</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Agent Name: <code className="text-slate-300 font-mono">CPCB_AQI_Orchestration_Agent</code> • Backend: <code className="text-slate-300 font-mono">gemini-3.8-flash</code>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5 text-cyan-400" />
            <span>Tools: <strong className="text-slate-200">fetch_cpcb_realtime_aqi</strong></span>
          </div>
          <span className="text-slate-600">•</span>
          <div>
            Latency: <strong className="text-emerald-400">{orchestrationResult?.elapsed_ms || 180}ms</strong>
          </div>
        </div>
      </div>

      {/* Terminal Log Console */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[480px]">
        {/* Terminal Header */}
        <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-xs font-mono text-slate-400 ml-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              adk-agent-runner.log
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter buttons */}
            <div className="flex items-center bg-slate-950 p-0.5 rounded text-[11px] font-mono border border-slate-800">
              {(['ALL', 'TOOL_CALL', 'DATA_NORMALIZATION', 'LLM_REASONING'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setLogFilter(mode)}
                  className={`px-2 py-0.5 rounded transition ${
                    logFilter === mode ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {mode.replace('_', ' ')}
                </button>
              ))}
            </div>

            <button
              onClick={onClearLogs}
              className="text-xs text-slate-500 hover:text-slate-300 px-2 py-1 rounded hover:bg-slate-800 transition"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Logs Output */}
        <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-2 select-text">
          {filteredLogs.length === 0 ? (
            <div className="text-slate-600 text-center py-12">
              No logs match the current filter.
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-2 hover:bg-slate-900/40 p-1 rounded transition">
                <span className="text-slate-600 select-none text-[11px]">{log.timestamp}</span>
                {getLogBadge(log.type)}
                <span className="text-slate-200 flex-1">{log.message}</span>
                {log.details && (
                  <span className="text-slate-500 text-[11px] truncate max-w-xs">{log.details}</span>
                )}
              </div>
            ))
          )}
        </div>

        {/* Interactive Query Input to ADK Agent */}
        <div className="p-3 bg-slate-900 border-t border-slate-800">
          <form onSubmit={handleSendQuery} className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-2.5 text-xs text-emerald-400 font-mono">
                agent&gt;
              </span>
              <input
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="Ask ADK Agent to evaluate pollution hotspots (e.g. 'Compare Delhi and Mumbai AQI')..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-16 pr-4 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500 transition placeholder-slate-600"
              />
            </div>
            <button
              type="submit"
              disabled={isQuerying || !queryInput.trim()}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
            >
              {isQuerying ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
              <span>Query Agent</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
