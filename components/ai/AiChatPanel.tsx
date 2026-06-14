'use client';
import { useState } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessage { role: 'user' | 'assistant'; content: string; }

const QUICK_ACTIONS = [
  { emoji: '📝', label: 'Tulis ulang judul produkku' },
  { emoji: '📊', label: 'Jelaskan tren penjualan bulan ini' },
  { emoji: '❓', label: 'Kenapa penjualanku turun minggu lalu?' },
  { emoji: '🎯', label: 'Strategi naik revenue 20% bulan depan' },
];

export function AiChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { role: 'user', content: text };
    const aiReply: ChatMessage = {
      role: 'assistant',
      content: `Terima kasih atas pertanyaan Anda tentang "${text.slice(0, 50)}..."\n\nBerikut analisis singkat:\n\n1. **Tren penjualan** menunjukkan kenaikan 12.5% bulan ini\n2. Produk terlaris saat ini adalah Enterprise Suite Pro\n3. Rekomendasi: Fokuskan promosi pada kategori Elektronik yang menunjukkan pertumbuhan tercepat\n\nApakah ada hal lain yang ingin Anda tanyakan?`,
    };
    setMessages((prev) => [...prev, userMsg, aiReply]);
    setInput('');
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 w-96 h-[520px] flex flex-col rounded-2xl border border-dn-border bg-surface shadow-2xl animate-slide-up overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-primary text-white shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          <span className="font-display font-semibold">Ecometrics AI</span>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/20 transition-colors"><X className="h-4 w-4" /></button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="space-y-3">
            <p className="text-sm text-text-muted text-center mb-4">Halo! Saya asisten bisnis Anda. Pilih pertanyaan di bawah atau ketik sendiri.</p>
            {QUICK_ACTIONS.map((action, i) => (
              <button key={i} onClick={() => sendMessage(action.label)} className="w-full text-left px-3 py-2.5 text-sm rounded-lg border border-dn-border hover:bg-surface-hover transition-colors text-text-secondary">
                {action.emoji} {action.label}
              </button>
            ))}
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
              <div className={cn('max-w-[80%] rounded-xl px-3 py-2.5 text-sm whitespace-pre-wrap', msg.role === 'user' ? 'bg-primary text-white' : 'bg-background text-text-primary border border-dn-border')}>
                {msg.content}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-dn-border p-3">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
            placeholder="Ketik pertanyaan..."
            className="flex-1 px-3 py-2 text-sm border border-dn-border rounded-lg bg-background text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button onClick={() => sendMessage(input)} className="p-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
