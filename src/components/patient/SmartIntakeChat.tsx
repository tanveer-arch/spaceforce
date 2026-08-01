import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send, AlertTriangle, Activity, Phone, PhoneCall, Building2, Calendar, CheckCircle2, Bot } from 'lucide-react';
import { AgentPipelineResult, AgentStatus } from '../../types';

export const SmartIntakeChat: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant' | 'system', text: string }[]>([
    { role: 'assistant', text: "Hello. Please tap the microphone or type to describe what the patient is experiencing. I will analyze the symptoms immediately." }
  ]);
  
  // Pipeline state
  const [pipelineState, setPipelineState] = useState<{
    intake: AgentStatus;
    triage: AgentStatus;
    orchestrator: AgentStatus;
    empathy: AgentStatus;
  }>({
    intake: 'idle',
    triage: 'idle',
    orchestrator: 'idle',
    empathy: 'idle'
  });

  const [result, setResult] = useState<AgentPipelineResult | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText;
    setInputText('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setResult(null);

    // Start pipeline
    setPipelineState({ intake: 'processing', triage: 'idle', orchestrator: 'idle', empathy: 'idle' });

    try {
      // Simulate real-time progress for visual effect (the actual backend does it all in one request, 
      // but we animate the progress tracker to show the 4 steps as requested in the plan)
      
      const simulateProgress = async () => {
        await new Promise(r => setTimeout(r, 1000));
        setPipelineState(prev => ({ ...prev, intake: 'complete', triage: 'processing' }));
        await new Promise(r => setTimeout(r, 1500));
        setPipelineState(prev => ({ ...prev, triage: 'complete', orchestrator: 'processing' }));
        await new Promise(r => setTimeout(r, 1000));
        setPipelineState(prev => ({ ...prev, orchestrator: 'complete', empathy: 'processing' }));
      };
      
      simulateProgress();

      const response = await fetch('/api/agents/orchestrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: userText,
          patientId: 'p-101'
        })
      });

      if (!response.ok) {
        throw new Error('Clinical Engine Unavailable - Real-time processing failed.');
      }

      const data: AgentPipelineResult = await response.json();
      setResult(data);
      setPipelineState({ intake: 'complete', triage: 'complete', orchestrator: 'complete', empathy: 'complete' });
      setMessages(prev => [...prev, { role: 'assistant', text: data.empathy.spokenText }]);

      // Play audio if returned
      if (data.empathy.audioBase64) {
        const audioSrc = `data:audio/mpeg;base64,${data.empathy.audioBase64}`;
        if (audioRef.current) {
          audioRef.current.src = audioSrc;
          audioRef.current.play().catch(e => console.error("Audio play failed:", e));
        }
      }

    } catch (err: any) {
      console.error(err);
      setPipelineState({ intake: 'error', triage: 'error', orchestrator: 'error', empathy: 'error' });
      setMessages(prev => [...prev, { 
        role: 'system', 
        text: err.message || 'System Failure: Unable to connect to NVIDIA NIM. Please retry or contact emergency services directly.' 
      }]);
    }
  };

  const StatusIcon = ({ status }: { status: AgentStatus }) => {
    if (status === 'processing') return <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>;
    if (status === 'complete') return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    if (status === 'error') return <AlertTriangle className="w-4 h-4 text-red-500" />;
    return <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>;
  };

  // Emergency Lockdown UI
  if (result && result.triage.priority === 'HIGH') {
    return (
      <div className="fixed inset-0 z-50 bg-red-600 text-white flex flex-col p-8 overflow-y-auto">
        <audio ref={audioRef} />
        
        <div className="max-w-4xl mx-auto w-full space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="flex items-center gap-4 text-white">
            <AlertTriangle className="w-16 h-16 animate-pulse" />
            <div>
              <h1 className="text-4xl font-bold">EMERGENCY PROTOCOL ACTIVATED</h1>
              <p className="text-xl text-red-100 mt-2">Suspected {result.triage.suspected_risk}</p>
            </div>
          </div>

          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Bot className="w-6 h-6" /> Assistant Instructions
            </h2>
            <p className="text-2xl leading-relaxed font-medium">"{result.empathy.spokenText}"</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b pb-4">
                <Activity className="w-6 h-6 text-red-600" /> Actions Taken
              </h3>
              <div className="space-y-4">
                {result.orchestration.actions.map((action, i) => (
                  <div key={i} className="flex items-start gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">{action.action}</p>
                      {action.details && <p className="text-sm text-slate-600 mt-1">{action.details}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {result.orchestration.hospital && (
              <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-xl border-t-8 border-red-600">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b pb-4">
                  <Building2 className="w-6 h-6 text-red-600" /> Nearest Hospital Identified
                </h3>
                <div className="space-y-2">
                  <p className="text-2xl font-black text-red-600">{result.orchestration.hospital.name}</p>
                  <p className="text-slate-600">{result.orchestration.hospital.address}</p>
                  <div className="flex gap-4 mt-6 pt-6 border-t">
                    <div>
                      <p className="text-sm text-slate-500 uppercase font-bold">Distance</p>
                      <p className="text-xl font-bold">{result.orchestration.hospital.distance}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 uppercase font-bold">ETA</p>
                      <p className="text-xl font-bold">{result.orchestration.hospital.eta}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="text-center pt-8">
            <button onClick={() => setResult(null)} className="px-8 py-3 bg-white/20 hover:bg-white/30 rounded-xl font-bold transition">
              Acknowledge & Exit Lockdown
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <audio ref={audioRef} />
      
      {/* Header */}
      <div className="bg-slate-900 text-white p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/20 p-2 rounded-lg">
            <Bot className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="font-bold text-lg leading-tight">Smart Intake Engine</h2>
            <p className="text-slate-400 text-sm">Powered by NVIDIA NIM Llama 3.1</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
        {messages.map((msg, i) => (
          <div key={i} className={\`flex \${msg.role === 'user' ? 'justify-end' : 'justify-start'}\`}>
            <div className={\`max-w-[80%] p-4 rounded-2xl \${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-sm' 
                : msg.role === 'system'
                ? 'bg-red-50 text-red-700 border border-red-200 rounded-tl-sm'
                : 'bg-white text-slate-900 border border-slate-200 rounded-tl-sm shadow-sm'
            }\`}>
              <p className={\`\${msg.role === 'assistant' ? 'text-lg' : ''}\`}>{msg.text}</p>
            </div>
          </div>
        ))}

        {/* Pipeline Tracker */}
        {(pipelineState.intake !== 'idle' && !result) && (
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm w-80">
            <h4 className="font-bold text-slate-900 text-sm mb-4">Pipeline Status</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <StatusIcon status={pipelineState.intake} />
                <span className={pipelineState.intake === 'processing' ? 'text-blue-600 font-medium' : 'text-slate-600'}>
                  Smart Intake (Llama 8B)
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <StatusIcon status={pipelineState.triage} />
                <span className={pipelineState.triage === 'processing' ? 'text-blue-600 font-medium' : 'text-slate-600'}>
                  Clinical Reasoning (Llama 70B)
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <StatusIcon status={pipelineState.orchestrator} />
                <span className={pipelineState.orchestrator === 'processing' ? 'text-blue-600 font-medium' : 'text-slate-600'}>
                  Action Orchestrator
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <StatusIcon status={pipelineState.empathy} />
                <span className={pipelineState.empathy === 'processing' ? 'text-blue-600 font-medium' : 'text-slate-600'}>
                  Generating Response (TTS)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Medium/Normal Result Panel */}
        {result && result.triage.priority !== 'HIGH' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mt-4 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-start gap-4 mb-6">
              <div className={\`p-3 rounded-xl \${result.triage.priority === 'MEDIUM' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}\`}>
                {result.triage.priority === 'MEDIUM' ? <Calendar className="w-6 h-6" /> : <Activity className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="font-bold text-lg">{result.triage.priority === 'MEDIUM' ? 'Urgent Care Needed' : 'Routine Logging'}</h3>
                <p className="text-slate-600">Suspected: {result.triage.suspected_risk}</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {result.orchestration.actions.map((action, i) => (
                <div key={i} className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-900">{action.action}</p>
                    {action.details && <p className="text-sm text-slate-600">{action.details}</p>}
                  </div>
                </div>
              ))}
            </div>
            
            {result.orchestration.nudge && (
              <div className="bg-blue-50 text-blue-800 p-4 rounded-xl border border-blue-100 text-sm">
                <span className="font-bold">SMS Sent:</span> "{result.orchestration.nudge}"
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200 shrink-0">
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <button 
            type="button"
            className={\`p-4 rounded-full transition-all \${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}\`}
            onClick={() => setIsRecording(!isRecording)}
          >
            <Mic className="w-6 h-6" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type symptoms here..."
              className="w-full bg-slate-100 border-transparent rounded-2xl py-4 px-6 text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              disabled={pipelineState.intake === 'processing'}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={!inputText.trim() || pipelineState.intake === 'processing'}
            className="p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};
