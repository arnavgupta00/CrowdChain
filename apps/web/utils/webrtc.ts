// app/utils/webrtc.ts
import { CALLS_CONFIG } from "../config";

export async function createCallsSession() {
  const response = await fetch(`${CALLS_CONFIG.API_BASE}/sessions/new`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${CALLS_CONFIG.APP_TOKEN}`,
    },
  });
  const data: any = await response.json();
  return data.sessionId;
}

export function createPeerConnection() {
  return new RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.cloudflare.com:3478",
      },
    ],
    bundlePolicy: "max-bundle",
  });
}
