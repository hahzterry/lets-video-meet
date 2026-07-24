"use client";

import { X, ExternalLink } from "lucide-react";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingCreated?: (booking: any) => void;
}

export function ScheduleModal({ isOpen, onClose, onBookingCreated }: ScheduleModalProps) {
  if (!isOpen) return null;

  const handleBooking = () => {
    window.open("https://cal.com/hahz-terry-8pcalt", "_blank");
    if (onBookingCreated) {
      onBookingCreated({ success: true });
    }
    // Close the modal
    setTimeout(onClose, 300);
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

        <div className="p-6 text-center">
          <div className="text-5xl mb-4">📅</div>
          <h2 className="text-xl font-semibold text-white mb-2">Schedule a Call</h2>
          <p className="text-sm text-white/50 mb-6">
            You'll be taken to Cal.com to choose a time that works for you.
          </p>

          <button
            onClick={handleBooking}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white font-semibold transition"
          >
            <ExternalLink size={18} />
            Book a Time
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