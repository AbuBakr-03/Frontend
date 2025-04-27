import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  PhoneOff,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthProvider";

// Simplified one-on-one video conference component using WebRTC
const Videomeeting: React.FC = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const { auth } = useAuth();

  // Initialize local media stream
  useEffect(() => {
    const initLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // In a real implementation, we would:
        // 1. Connect to a signaling server
        // 2. Create a peer connection
        // 3. Exchange ICE candidates
        // 4. Set up data channels

        // For demo purposes, we'll mock a remote connection after a delay
        setTimeout(() => {
          // This is just for the demo UI - in a real app,
          // the remote stream would come from a WebRTC connection
          setIsConnected(true);
          const mockRemoteStream = stream.clone();
          setRemoteStream(mockRemoteStream);
        }, 2000);
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    };

    initLocalStream();

    // Cleanup function
    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Update remote video when remote stream changes
  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  // Toggle microphone
  const toggleMic = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMicOn(!isMicOn);
    }
  };

  // Toggle video
  const toggleVideo = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      videoTracks.forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoOn(!isVideoOn);
    }
  };

  // End call
  const endCall = () => {
    // In a real app, we would disconnect from the signaling server
    // and close the peer connection
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    window.history.back();
  };

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      {/* Meeting header */}
      <div className="flex items-center justify-between bg-white p-4 shadow">
        <h1 className="text-xl font-semibold">
          Interview Session: {meetingId}
        </h1>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1.5 text-sm font-medium ${isConnected ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
          >
            {isConnected ? "Connected" : "Waiting for other participant..."}
          </span>
        </div>
      </div>

      {/* Video container */}
      <div className="flex flex-1 items-center justify-center bg-gray-900 p-4">
        <div className="relative flex h-full w-full max-w-6xl flex-col md:flex-row md:items-center md:justify-center md:gap-4">
          {/* Main video (remote) */}
          <div className="relative mb-4 h-full w-full overflow-hidden rounded-xl bg-black md:mb-0 md:max-h-[80vh] md:flex-1">
            {isConnected ? (
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center text-white">
                  <div className="mb-4 text-4xl">👋</div>
                  <p className="text-xl">
                    Waiting for the other participant to join...
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Local video (picture-in-picture) */}
          <div className="absolute bottom-4 right-4 h-32 w-48 overflow-hidden rounded-lg border-2 border-white bg-black shadow-lg md:h-40 md:w-64">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-xs text-white">
              You{isVideoOn ? "" : " (Video Off)"}
            </div>
          </div>
        </div>
      </div>

      {/* Video controls */}
      <div className="flex items-center justify-center gap-4 bg-white p-4 shadow-lg">
        <Button
          variant={isMicOn ? "outline" : "destructive"}
          size="icon"
          className="h-12 w-12 rounded-full"
          onClick={toggleMic}
        >
          {isMicOn ? <Mic /> : <MicOff />}
        </Button>

        <Button
          variant={isVideoOn ? "outline" : "destructive"}
          size="icon"
          className="h-12 w-12 rounded-full"
          onClick={toggleVideo}
        >
          {isVideoOn ? <VideoIcon /> : <VideoOff />}
        </Button>

        <Button
          variant="destructive"
          size="icon"
          className="h-12 w-12 rounded-full"
          onClick={endCall}
        >
          <PhoneOff />
        </Button>
      </div>
    </div>
  );
};

export default Videomeeting;
