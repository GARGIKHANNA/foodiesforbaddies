import React, { useState } from 'react';

interface ChatModalProps {
  driverName: string;
  driverPhoto: string;
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({ driverName, driverPhoto, onClose }) => {
  const [messages, setMessages] = useState<{ sender: 'user' | 'driver'; text: string; time: string }[]>([
    {
      sender: 'driver',
      text: "Hi! I just picked up your Smash & Bun order. It's packed in the thermal insulated bag to keep it piping hot!",
      time: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');

  const quickReplies = ['Please leave at front door', 'Ring bell upon arrival', 'Thank you so much!'];

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'user' as const, text, time: now };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Driver auto reply
    setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      let reply = 'Got it! On my way now, about 8 minutes out.';
      if (text.toLowerCase().includes('door')) {
        reply = 'Will place it safely right at your front door as requested!';
      } else if (text.toLowerCase().includes('bell')) {
        reply = 'Understood, will give the doorbell a quick ring when dropped off!';
      }
      setMessages((prev) => [...prev, { sender: 'driver', text: reply, time: replyTime }]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl h-[520px] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="p-4 bg-[#fcf9f8] border-b border-[#f0edec] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={driverPhoto}
                alt={driverName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#ffdad8]"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1c1b1b]">{driverName}</h3>
              <p className="text-[11px] text-[#006762] font-semibold">Active Courier • Driving to you</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f0edec] flex items-center justify-center text-[#5c5f60] hover:text-[#1c1b1b]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Message history */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#fcf9f8]/50 no-scrollbar">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-xs sm:text-sm ${
                  m.sender === 'user'
                    ? 'bg-[#b7122a] text-white rounded-tr-none'
                    : 'bg-white text-[#1c1b1b] border border-[#f0edec] shadow-sm rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-[#5c5f60] mt-1 px-1">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Quick replies */}
        <div className="px-3 py-1.5 bg-white border-t border-[#f0edec] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {quickReplies.map((qr) => (
            <button
              key={qr}
              onClick={() => sendMessage(qr)}
              className="text-[11px] bg-[#f0edec] hover:bg-[#ffdad8] text-[#1c1b1b] px-2.5 py-1 rounded-full whitespace-nowrap active:scale-95 transition-all"
            >
              {qr}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-[#f0edec] flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputText)}
            placeholder="Type a message to your courier..."
            className="flex-1 px-3.5 py-2 text-xs bg-[#f0edec] rounded-full outline-none focus:ring-1 focus:ring-[#b7122a]"
          />
          <button
            onClick={() => sendMessage(inputText)}
            className="w-9 h-9 rounded-full bg-[#b7122a] text-white flex items-center justify-center shrink-0 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
