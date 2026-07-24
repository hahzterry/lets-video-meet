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
  const [isScriptReady, setIsScriptReady] = useState(false);

  // ── Load Cal.com script if not already present ────────────────────────────
  useEffect(() => {
    const checkScript = () => {
      const calScript = document.querySelector(
        'script[src="https://app.cal.com/embed.js"]'
      );
      if (calScript) {
        setIsScriptReady(true);
        console.log("✅ Cal.com script is loaded");
        return;
      }

      // Dynamically load script
      const script = document.createElement("script");
      script.src = "https://app.cal.com/embed.js";
      script.async = true;
      script.onload = () => {
        setIsScriptReady(true);
        console.log("✅ Cal.com script loaded dynamically");
      };
      script.onerror = () => {
        console.error("❌ Failed to load Cal.com script");
      };
      document.body.appendChild(script);
    };

    if (typeof window !== "undefined") {
      checkScript();
    }
  }, []);

  // ── Handle booking event ───────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen || !isScriptReady) return;

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
  }, [isOpen, isScriptReady, onBookingCreated]);

  // ── Re‑initialize the embed after the modal opens ─────────────────────────
  useEffect(() => {
    if (!isOpen || !isScriptReady) return;

    const timer = setTimeout(() => {
      const el = containerRef.current;
      if (el && window.Cal) {
        // ✅ Fix: cast to any to bypass TypeScript type error
        (window.Cal as any)("init", {
          debug: false,
        });
        console.log("🔄 Cal.com embed re-initialized");
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [isOpen, isScriptReady]);

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
            Select a time that works for you. After booking, you'll be
            redirected to your meeting room.
          </p>

          {!isScriptReady ? (
            <div className="flex items-center justify-center h-[500px] text-white/30">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm">Loading scheduler…</p>
              </div>
            </div>
          ) : (
            <div
              ref={containerRef}
              className="cal-inline"
              data-cal-link="hahz-terry-8pcalt"
              data-cal-config='{"layout":"month_view"}'
              style={{ minHeight: "500px", width: "100%" }}
            />
          )}

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