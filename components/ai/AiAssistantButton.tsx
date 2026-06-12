'use client';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { AiChatPanel } from './AiChatPanel';

export function AiAssistantButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary-light transition-all hover:scale-105 active:scale-95"
        aria-label="AI Assistant"
      >
        <Sparkles className="h-6 w-6" />
      </button>
      {open && <AiChatPanel onClose={() => setOpen(false)} />}
    </>
  );
}
