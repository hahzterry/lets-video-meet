"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingCreated?: (booking: any) => void;
}

export function ScheduleModal({ isOpen, onClose, onBookingCreated }: ScheduleModalProps) {
  const [isBookingComplete, setIsBookingComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleBooking = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      console.log("Booking created:", detail);
      setIsBookingComplete(true);
      if (onBookingCreated) {
        onBookingCreated(detail);
      }
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener("bookingCreated", handleBooking);
      return () => {
        el.removeEventListener("bookingCreated", handleBooking);
      };
    }
  }, [isOpen, onBookingCreated]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#0a0a12] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Schedule a Call</h2>
          <p className="text-sm text-white/50 mb-6">
            Select a time that works for you. After booking, you'll be redirected to your meeting room.
          </p>

          <div
            ref={containerRef}
            className="cal-inline"
            data-cal-link="hahz-terry-8pcalt"
            data-cal-config='{"layout":"month_view"}'
            style={{ minHeight: "500px", width: "100%" }}
          />

          {isBookingComplete && (
            <div className="mt-4 text-center">
              <p className="text-green-400">✅ Booking confirmed! Redirecting...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}