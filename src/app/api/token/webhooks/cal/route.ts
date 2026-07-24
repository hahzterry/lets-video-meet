// app/api/webhooks/cal/route.ts
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  if (payload.triggerEvent === "BOOKING_CREATED") {
    const roomName = `meeting-${payload.booking.uid}`;
    // Create a LiveKit room (you'll need your LiveKit server logic)
    // await createLiveKitRoom(roomName);
    // Optionally store booking metadata
    return Response.json({ success: true, room: roomName });
  }
  return Response.json({ success: false });
}