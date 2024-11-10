"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Progress } from "../../../../components/ui/progress";
import { ChatInterface } from "../../../../components/live-stream/chat-interface";
import { ProjectDetails } from "../../../../components/live-stream/project-details";
import { ContributeModal } from "../../../../components/live-stream/contribute-modal";

import { useParams, useRouter } from "next/navigation";
import VideoStream from "../../../../components/VideoStream";
import {
  createCallsSession,
  createPeerConnection,
} from "../../../../utils/webrtc";
import { CALLS_CONFIG } from "../../../../config";
import { getSocket } from "../../../../components/socket";
interface BroadcastMessage {
  sessionId: string;
  trackNameAudio: string | undefined;
  trackNameVideo: string | undefined;
}
export default function LiveStreamPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState<
    { id: number; text: string; sender: string }[]
  >([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState<any>(null);
  const [objectToPassInSocket, setObjectToPassInSocket] = useState<any>();

  const params = useParams();
  const id = params.id;

  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<string>("initializing");
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const sendMessage = (e: any) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: Date.now(), text: newMessage, sender: "User" },
      ]);
      setNewMessage("");
    }
  };

  const router = useRouter();

  useEffect(() => {
    async function setupSocket() {
      const socket = getSocket();
      socket.on("connect", () => {
        console.log("Connected to socket server");

        socket.emit("joinRoom", "roomName"); // Room Name /////////////////////////////////////////
      });

      socket.on("broadcastMessage", (message: any) => {
        console.log("Received message from server:", message);
        setObjectToPassInSocket(message);
      });

      setSocket(socket);
    }

    setupSocket();
    return () => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);
  async function joinSession() {
    try {
      // Create a new MediaStream that will persist
      mediaStreamRef.current = new MediaStream();
      setRemoteStream(mediaStreamRef.current);

      const remoteSessionId = await createCallsSession();
      const remotePeerConnection = await createPeerConnection();
      peerConnectionRef.current = remotePeerConnection;

      // Set up connection state monitoring
      remotePeerConnection.oniceconnectionstatechange = () => {
        console.log(
          "ICE Connection State:",
          remotePeerConnection.iceConnectionState
        );
        setConnectionStatus(remotePeerConnection.iceConnectionState);
      };

      remotePeerConnection.onconnectionstatechange = () => {
        console.log("Connection State:", remotePeerConnection.connectionState);
        setConnectionStatus(remotePeerConnection.connectionState);
      };

      // Handle ICE candidates
      remotePeerConnection.onicecandidate = (event) => {
        console.log("ICE candidate:", event.candidate);
      };

      // Set up track handling
      remotePeerConnection.ontrack = (event) => {
        console.log("Received track:", event.track.kind, event.track.id);

        if (mediaStreamRef.current) {
          // Remove any existing tracks of the same kind
          const existingTracks = mediaStreamRef.current
            .getTracks()
            .filter((track) => track.kind === event.track.kind);
          existingTracks.forEach((track) => {
            mediaStreamRef.current?.removeTrack(track);
          });

          // Add the new track
          mediaStreamRef.current.addTrack(event.track);

          // Force a state update
          setRemoteStream(null);
          setRemoteStream(mediaStreamRef.current);
        }
      };

      // const tracksToPull = [
      //   {
      //     location: "remote",
      //     trackName: params.trackName,
      //     sessionId: params.sessionId,
      //   },
      // ];

      console.log("Pulling tracks:", objectToPassInSocket);
      const message = objectToPassInSocket?.message;
      const tracksToPull = [
        {
          location: "remote",
          trackName: message?.trackNameAudio,
          sessionId: message?.sessionId,
        },
        {
          location: "remote",
          trackName: message?.trackNameVideo,
          sessionId: message?.sessionId,
        },
      ];

      console.log("Pulling tracks:", tracksToPull);

      const pullResponse = await fetch(
        `${CALLS_CONFIG.API_BASE}/sessions/${remoteSessionId}/tracks/new`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${CALLS_CONFIG.APP_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tracks: tracksToPull,
          }),
        }
      );

      const data: any = await pullResponse.json();
      console.log("Pull response:", data);

      if (data.requiresImmediateRenegotiation) {
        console.log("Setting remote description...");
        await remotePeerConnection.setRemoteDescription(
          data.sessionDescription
        );

        console.log("Creating answer...");
        const remoteAnswer = await remotePeerConnection.createAnswer();

        console.log("Setting local description...");
        await remotePeerConnection.setLocalDescription(remoteAnswer);

        console.log("Sending renegotiation...");
        const renegotiationResponse = await fetch(
          `${CALLS_CONFIG.API_BASE}/sessions/${remoteSessionId}/renegotiate`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${CALLS_CONFIG.APP_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sessionDescription: {
                sdp: remoteAnswer.sdp,
                type: "answer",
              },
            }),
          }
        );

        const renegotiationData: any = await renegotiationResponse.json();
        console.log("Renegotiation response:", renegotiationData);

        if (renegotiationData.errorCode) {
          throw new Error(renegotiationData.errorDescription);
        }
      }
    } catch (error) {
      console.error("Error joining session:", error);
      setConnectionStatus("failed");
    }
  }

  return (
    // <div className="container mx-auto p-4 min-h-screen bg-gray-900 text-gray-100">
    //   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    //     <div className="lg:col-span-2">
    //       <Card className="bg-gray-800 border-gray-700">
    //         <CardHeader>
    //           <CardTitle className="text-2xl font-bold">Live Stream</CardTitle>
    //         </CardHeader>
    <CardContent>
      <VideoStream stream={remoteStream} isRemote />
      <Button
        className="w-full bg-green-600 hover:bg-green-700 text-white"
        onClick={joinSession}
      >
        Join Session
      </Button>
    </CardContent>
    //   {/* </Card>
    // </div>
    // <div> */}

    //     </div>
    //     <div>
    //       <ProjectDetails
    //         title="Innovative Green Tech"
    //         description="Revolutionizing sustainable energy solutions for urban environments."
    //         raised={75000}
    //         goal={100000}
    //         daysLeft={15}
    //       />
    //       <Button
    //         className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
    //         onClick={() => setIsModalOpen(true)}
    //       >
    //         Contribute Now
    //       </Button>
    //     </div>
    //     <div className="lg:col-span-3">
    //       <ChatInterface
    //         messages={messages}
    //         sendMessage={sendMessage}
    //         newMessage={newMessage}
    //         setNewMessage={setNewMessage}
    //       />
    //     </div>
    //   </div>
    //   <ContributeModal
    //     isOpen={isModalOpen}
    //     onClose={() => setIsModalOpen(false)}
    //   />
    // </div>
  );
}
