"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingCreated?: (booking: any) => void;
}

export function ScheduleModal({ isOpen, onClose, onBookingCreated }: ScheduleModalProps) {
  // ── Debug: Log when modal renders ──────────────────────────────────────────
  useEffect(() => {
    console.log("🔵 ScheduleModal - isOpen:", isOpen);
  }, [isOpen]);

  if (!isOpen) {
    console.log("🔴 ScheduleModal - isOpen is false, returning null");
    return null;
  }

  console.log("🟢 ScheduleModal - RENDERING!");

  const handleBooking = () => {
    window.open("https://cal.com/hahz-terry-8pcalt", "_blank");
    if (onBookingCreated) {
      onBookingCreated({ success: true });
    }
    setTimeout(onClose, 500);
  };

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
            Click the button below to open the booking page.
          </p>

          <button
            onClick={handleBooking}
            className="flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white font-semibold transition"
          >
            📅 Book a Time
          </button>

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