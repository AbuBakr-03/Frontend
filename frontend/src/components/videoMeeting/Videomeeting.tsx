import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Video,
  StopCircle,
  Loader2,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthProvider";
import { toast } from "sonner";
import {
  findInterviewByMeetingId,
  analyzeRecording,
} from "../../APIs/InterviewApi";
// Interface for analysis results
interface AnalysisResult {
  success: boolean;
  message: string;
  emotions: Record<string, number>;
  confidence: number;
  result_id: number;
  result_title: string;
}

const Videomeeting: React.FC = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const navigate = useNavigate();
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );
  const [interviewId, setInterviewId] = useState<number | null>(null);

  // Refs for media elements
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const recordingTimerRef = useRef<number | null>(null);
  const recordedChunksRef = useRef<BlobPart[]>([]);

  const { auth } = useAuth();
  const isRecruiter = auth.user?.is_recruiter || auth.user?.is_superuser;

  // Effect to fetch interview data by meeting ID
  // Effect to fetch interview data by meeting ID
  useEffect(() => {
    const fetchInterviewByMeetingId = async () => {
      if (!meetingId) {
        console.log("No meetingId provided");
        return;
      }

      console.log("Fetching interview for meetingId:", meetingId);

      try {
        const interview = await findInterviewByMeetingId(meetingId);
        console.log("Interview data received:", interview);

        if (interview) {
          setInterviewId(interview.id);
          console.log("Interview ID set:", interview.id);
        } else {
          toast.error("Interview not found");
          console.log("No interview found for meetingId:", meetingId);
        }
      } catch (error) {
        console.error("Error in fetching interview:", error);
        toast.error("Could not fetch interview details");
        console.log("Error details:", error);
      }
    };

    fetchInterviewByMeetingId();
  }, [meetingId]);

  // Initialize local media stream
  useEffect(() => {
    const initLocalStream = async () => {
      console.log("Initializing local stream...");

      try {
        console.log("Requesting user media...");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        console.log("Local stream acquired:", stream);
        setLocalStream(stream);

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          console.log("Local video stream set to video element");
        }

        // In a real implementation, we would:
        // 1. Connect to a signaling server
        // 2. Create a peer connection
        // 3. Exchange ICE candidates
        // 4. Set up data channels

        // For demo purposes, we'll mock a remote connection after a delay
        console.log("Setting up mock remote connection...");
        setTimeout(() => {
          // This is just for the demo UI - in a real app,
          // the remote stream would come from a WebRTC connection
          setIsConnected(true);
          const mockRemoteStream = stream.clone();
          setRemoteStream(mockRemoteStream);
          console.log("Mock remote stream set:", mockRemoteStream);
        }, 2000);
      } catch (err) {
        console.error("Error accessing media devices:", err);
        toast.error("Could not access camera or microphone");
        console.log("Error details:", err);
      }
    };

    initLocalStream();

    // Cleanup function
    return () => {
      console.log("Cleaning up resources...");

      if (localStream) {
        console.log("Stopping local stream tracks...");
        localStream.getTracks().forEach((track) => track.stop());
      }

      if (recordingTimerRef.current) {
        console.log("Clearing recording timer...");
        clearInterval(recordingTimerRef.current);
      }

      if (mediaRecorder && mediaRecorder.state !== "inactive") {
        console.log("Stopping media recorder...");
        mediaRecorder.stop();
      }
    };
  }, []);

  // Update remote video when remote stream changes
  useEffect(() => {
    console.log("useEffect triggered - checking remoteStream...");

    if (remoteStream) {
      console.log("Remote stream is available, setting to video element.");
      if (remoteVideoRef.current) {
        try {
          remoteVideoRef.current.srcObject = remoteStream;
          console.log("Remote stream successfully set to video element.");
        } catch (err) {
          console.error("Error setting remote stream to video element:", err);
        }
      } else {
        console.log("Remote video element not available.");
      }
    } else {
      console.log("No remote stream available.");
    }
  }, [remoteStream]);

  // Candidate video recording functions
  const startCandidateRecording = async () => {
    console.log("startCandidateRecording called");

    if (!remoteStream) {
      console.log("No remote stream available, cannot start recording.");
      toast.error("No candidate video to record");
      return;
    }

    try {
      // Reset recorded chunks
      console.log("Resetting recorded chunks.");
      recordedChunksRef.current = [];

      // Create a MediaRecorder for the remote stream (candidate's webcam)
      const options = { mimeType: "video/webm; codecs=vp9" };
      console.log("Creating MediaRecorder with options:", options);
      const recorder = new MediaRecorder(remoteStream, options);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          console.log("Data available, adding chunk to recorded chunks.");
          recordedChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        console.log("Recording stopped.");

        // Instead of creating a download, we'll now send the recording for analysis
        if (isRecruiter && interviewId) {
          console.log("Processing recording for recruiter...");
          processRecording();
        } else {
          console.log("Creating download for non-recruiter...");
          const blob = new Blob(recordedChunksRef.current, {
            type: "video/webm",
          });
          const url = URL.createObjectURL(blob);

          // Create download link for non-recruiters
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = `candidate-${meetingId}-recording.webm`;
          document.body.appendChild(a);
          a.click();

          setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          }, 100);
        }

        setRecordingTime(0);
        setIsRecording(false);
        console.log("Recording stopped, cleanup done.");
      };

      // Start recording
      console.log("Starting recording...");
      recorder.start(1000); // Capture chunks every second
      setIsRecording(true);

      // Start timer
      recordingTimerRef.current = window.setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      toast.success("Candidate video recording started");
      console.log("Candidate video recording started successfully.");
    } catch (err) {
      console.error("Error starting candidate recording:", err);
      toast.error("Could not start recording");
      console.log("Error details:", err);
    }
  };

  const stopCandidateRecording = () => {
    console.log("stopCandidateRecording called");

    if (mediaRecorder) {
      console.log("Checking mediaRecorder state:", mediaRecorder.state);
      if (mediaRecorder.state !== "inactive") {
        try {
          console.log("Stopping mediaRecorder...");
          mediaRecorder.stop();
        } catch (err) {
          console.error("Error stopping mediaRecorder:", err);
          toast.error("Error stopping video recording");
          console.log("Error details:", err);
        }
      } else {
        console.log("MediaRecorder is already inactive.");
      }
    } else {
      console.log("No mediaRecorder available.");
    }

    if (recordingTimerRef.current) {
      console.log("Clearing recording timer...");
      clearInterval(recordingTimerRef.current);
    }

    toast.info("Candidate video recording stopped");
    console.log("Candidate video recording stopped.");
  };

  // New function to process recording and send to backend for analysis
  // New function to process recording and send to backend for analysis
  const processRecording = async () => {
    console.log("processRecording called");

    if (!interviewId || recordedChunksRef.current.length === 0) {
      console.log("No recording available to analyze or missing interviewId.");
      toast.error("No recording available to analyze");
      return;
    }

    setIsProcessing(true);
    console.log("Starting recording analysis...");

    try {
      // Create a blob from the recorded chunks
      console.log("Creating blob from recorded chunks...");
      const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });

      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onloadend = async () => {
        console.log("FileReader finished loading, base64 data ready.");

        // Get base64 data
        const base64data = reader.result as string;
        console.log("Base64 data created:", base64data.substring(0, 50)); // Log a portion of base64 data for inspection

        try {
          // Send to backend for analysis using our API service
          console.log("Sending base64 data for analysis...");
          const result = await analyzeRecording(interviewId, base64data);

          // Handle successful analysis
          console.log("Analysis complete:", result);
          setAnalysisResult(result);
          toast.success("Analysis complete", {
            description: `Result: ${result.result_title}`,
          });
        } catch (error) {
          console.error("Error analyzing recording:", error);
          toast.error("Failed to analyze recording");
          console.log("Error details:", error);
        } finally {
          setIsProcessing(false);
          console.log("Processing complete.");
        }
      };

      reader.onerror = (err) => {
        console.error("Error reading file:", err);
        toast.error("Failed to read recording file");
      };
    } catch (error) {
      console.error("Error processing recording:", error);
      toast.error("Failed to prepare recording for analysis");
      setIsProcessing(false);
      console.log("Error details:", error);
    }
  };

  // Format recording time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

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
    console.log("endCall called");

    // Stop recording if active
    if (isRecording) {
      console.log("Recording is active, stopping recording...");
      try {
        stopCandidateRecording();
      } catch (error) {
        console.error("Error stopping candidate recording:", error);
        toast.error("Failed to stop recording");
      }
    } else {
      console.log("No active recording to stop.");
    }

    // Stop all streams
    if (localStream) {
      console.log("Stopping local stream...");
      try {
        localStream.getTracks().forEach((track) => {
          console.log("Stopping track:", track);
          track.stop();
        });
      } catch (error) {
        console.error("Error stopping local stream tracks:", error);
        toast.error("Failed to stop local stream");
      }
    } else {
      console.log("No local stream available to stop.");
    }

    // Go back to the previous page
    try {
      console.log("Navigating back to the previous page...");
      window.history.back();
    } catch (error) {
      console.error("Error navigating back:", error);
      toast.error("Failed to navigate back");
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      {/* Meeting header */}
      <div className="flex items-center justify-between bg-white p-4 shadow">
        <h1 className="text-xl font-semibold">
          Interview Session: {meetingId}
        </h1>
        <div className="flex items-center gap-2">
          {isRecording && (
            <div className="flex items-center gap-2 rounded-full bg-red-100 px-3 py-1.5 text-sm font-medium text-red-800">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-600"></span>
              <span>Recording candidate {formatTime(recordingTime)}</span>
            </div>
          )}
          {isProcessing && (
            <div className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-800">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Analyzing recording...</span>
            </div>
          )}
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
          {/* Main video (remote/candidate) */}
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

            {/* Recording indicator overlay on candidate video */}
            {isRecording && (
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded bg-red-500/80 px-3 py-1 text-sm text-white">
                <span className="h-2 w-2 animate-pulse rounded-full bg-white"></span>
                <span>REC</span>
              </div>
            )}

            {/* Analysis results overlay when available */}
            {analysisResult && (
              <div className="absolute bottom-4 left-4 max-w-xs rounded bg-black/70 p-4 text-white">
                <h3 className="mb-2 font-semibold">Analysis Results</h3>
                <p className="mb-2">
                  Confidence: {analysisResult.confidence.toFixed(2)}%
                </p>
                <p className="mb-1 text-sm">Emotions detected:</p>
                <ul className="mb-2 text-xs">
                  {Object.entries(analysisResult.emotions).map(
                    ([emotion, count]) => (
                      <li key={emotion}>
                        {emotion}: {count} occurrences
                      </li>
                    ),
                  )}
                </ul>
                <p
                  className={`font-medium ${
                    analysisResult.result_id === 2
                      ? "text-green-400"
                      : analysisResult.result_id === 3
                        ? "text-red-400"
                        : "text-yellow-400"
                  }`}
                >
                  Result: {analysisResult.result_title}
                </p>
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
          {isVideoOn ? <Video /> : <VideoOff />}
        </Button>

        {/* Candidate video recording buttons - only visible for recruiters */}
        {isRecruiter &&
          isConnected &&
          (isRecording ? (
            <Button
              variant="destructive"
              size="icon"
              className="h-12 w-12 rounded-full"
              onClick={stopCandidateRecording}
            >
              <StopCircle />
            </Button>
          ) : (
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full"
              onClick={startCandidateRecording}
              title="Record candidate video"
              disabled={isProcessing}
            >
              <Video />
            </Button>
          ))}

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
