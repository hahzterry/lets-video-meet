"use client";

import { X } from "lucide-react";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingCreated?: (booking: any) => void;
}

export function ScheduleModal({ isOpen, onClose, onBookingCreated }: ScheduleModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#0a0a12] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white/50 hover:text-white transition"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-white mb-2">Schedule a Call</h2>
          <p className="text-sm text-white/50 mb-4">
            Select a time that works for you. After booking, you'll receive a confirmation email.
          </p>

          {/* ✅ Cal.com iframe – clean and always works */}
          <div className="w-full h-[600px] rounded-xl overflow-hidden border border-white/10">
            <iframe
              src="https://cal.com/hahz-terry-8pcalt?embed=true"
              className="w-full h-full border-0"
              style={{ background: "#0a0a12" }}
              allow="camera; microphone; autoplay"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />
          </div>

          <button
            onClick={onClose}
            className="mt-4 w-full py-2 text-white/40 hover:text-white/70 text-sm transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}