"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingCreated?: (booking: any) => void;
}

export function ScheduleModal({ isOpen, onClose, onBookingCreated }: ScheduleModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#0a0a12] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-white mb-2">Schedule a Call</h2>
          <p className="text-sm text-white/50 mb-6">
            Click below to open the booking page in a new tab.
          </p>

          <a
            href="https://cal.com/hahz-terry-8pcalt"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              setTimeout(() => {
                if (onBookingCreated) {
                  // Simulate booking creation (or rely on webhook)
                  onBookingCreated({ success: true });
                }
                onClose();
              }, 2000);
            }}
            className="flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white font-semibold transition"
          >
            📅 Book a Time
          </a>

          <button
            onClick={onClose}
            className="mt-3 w-full py-2 text-white/40 hover:text-white/70 text-sm transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}