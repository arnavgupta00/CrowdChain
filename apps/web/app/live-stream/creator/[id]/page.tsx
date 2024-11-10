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

export default function LiveStreamPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState<
    { id: number; text: string; sender: string }[]
  >([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState<any>(null);
  const params = useParams();
  const id = params.id;
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

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function setupLocalStream() {
      try {
        const media = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        setLocalStream(media);
        const socket = getSocket();
        socket.on("connect", () => {
          console.log("Connected to socket server");
        });

        setSocket(socket);
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    }

    setupLocalStream();
  }, []);

  async function handleStartSession(roomId: string) {
    if (!localStream) return;

    const localSessionId = await createCallsSession();
    const localPeerConnection = await createPeerConnection();

    const transceivers = localStream.getTracks().map((track) =>
      localPeerConnection.addTransceiver(track, {
        direction: "sendonly",
      })
    );

    const localOffer = await localPeerConnection.createOffer();
    await localPeerConnection.setLocalDescription(localOffer);

    const response = await fetch(
      `${CALLS_CONFIG.API_BASE}/sessions/${localSessionId}/tracks/new`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CALLS_CONFIG.APP_TOKEN}`,
        },
        body: JSON.stringify({
          sessionDescription: {
            sdp: localOffer.sdp,
            type: "offer",
          },
          tracks: transceivers.map(({ mid, sender }) => ({
            location: "local",
            mid,
            trackName: sender.track?.id,
          })),
        }),
      }
    );

    const data: any = await response.json();
    await localPeerConnection.setRemoteDescription(
      new RTCSessionDescription(data.sessionDescription)
    );

    // Navigate to the join page with session ID and first track name
    const firstTrack = localStream.getTracks()[0];
    const secondTrack = localStream.getTracks()[1];
    // router.push(`/${localSessionId}/${firstTrack.id}`);

    console.log("Response:", data);
    console.log("Session started:", localSessionId);
    console.log("Track 1", firstTrack);
    console.log("Track 2", secondTrack);

    const objectToPassInSocket = {
      sessionId: localSessionId,
      trackNameAudio: firstTrack?.id,
      trackNameVideo: secondTrack?.id,
    };
    socket.emit("broadcastObjectMessage", roomId, objectToPassInSocket); //roomName is the room name
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
      <VideoStream stream={localStream} muted />
      <button onClick={() =>{ 
        //@ts-ignore
        handleStartSession(id)}}>
        Start Session
      </button>
    </CardContent>
    //       </Card>
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
