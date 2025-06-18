"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mic, Square, Play, Pause, Save, Trash2 } from "lucide-react"

export default function VoicePage() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [transcription, setTranscription] = useState("")
  const [isTranscribing, setIsTranscribing] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks: BlobPart[] = []
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" })
        setAudioBlob(blob)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      intervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("Could not access microphone. Please check permissions.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }

  const playRecording = () => {
    if (audioBlob && audioRef.current) {
      const audioUrl = URL.createObjectURL(audioBlob)
      audioRef.current.src = audioUrl
      audioRef.current.play()
      setIsPlaying(true)

      audioRef.current.onended = () => {
        setIsPlaying(false)
      }
    }
  }

  const pauseRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const transcribeAudio = async () => {
    if (!audioBlob) return

    setIsTranscribing(true)
    // Simulate transcription - in a real app, you'd send this to a transcription service
    setTimeout(() => {
      setTranscription(
        "This is a sample transcription of your voice recording. In a real application, this would be the actual transcribed text from your audio using services like OpenAI Whisper, Google Speech-to-Text, or similar.",
      )
      setIsTranscribing(false)
    }, 2000)
  }

  const deleteRecording = () => {
    setAudioBlob(null)
    setTranscription("")
    setRecordingTime(0)
    setIsPlaying(false)
  }

  const saveEntry = () => {
    if (transcription) {
      // Here you would save the transcription as a journal entry
      alert("Voice entry saved successfully!")
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Voice Journal Entry</h1>
          <p className="text-slate-600">Sometimes it's easier to speak your thoughts than write them</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recording Interface */}
          <Card>
            <CardHeader>
              <CardTitle>Voice Recording</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Recording Visualization */}
              <div className="flex justify-center">
                <div className="relative">
                  <div
                    className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isRecording ? "bg-red-500 shadow-lg shadow-red-500/50" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    <Mic className="w-12 h-12 text-white" />
                  </div>

                  {/* Pulse animation when recording */}
                  {isRecording && (
                    <>
                      <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20"></div>
                      <div className="absolute inset-0 rounded-full bg-red-500 animate-pulse opacity-30"></div>
                    </>
                  )}
                </div>
              </div>

              {/* Recording Time */}
              <div className="text-center">
                <div className="text-3xl font-mono font-bold text-slate-800">{formatTime(recordingTime)}</div>
                <Badge variant={isRecording ? "destructive" : "secondary"} className="mt-2">
                  {isRecording ? "Recording..." : "Ready to record"}
                </Badge>
              </div>

              {/* Audio Visualization Bars */}
              {isRecording && (
                <div className="flex justify-center items-end space-x-1 h-16">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-red-500 voice-wave"
                      style={{
                        width: "4px",
                        height: `${Math.random() * 60 + 10}px`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Controls */}
              <div className="flex justify-center space-x-4">
                {!isRecording ? (
                  <Button onClick={startRecording} size="lg" className="bg-red-500 hover:bg-red-600">
                    <Mic className="w-4 h-4 mr-2" />
                    Start Recording
                  </Button>
                ) : (
                  <Button onClick={stopRecording} size="lg" variant="outline">
                    <Square className="w-4 h-4 mr-2" />
                    Stop Recording
                  </Button>
                )}
              </div>

              {/* Playback Controls */}
              {audioBlob && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex justify-center space-x-4">
                    {!isPlaying ? (
                      <Button onClick={playRecording} variant="outline">
                        <Play className="w-4 h-4 mr-2" />
                        Play
                      </Button>
                    ) : (
                      <Button onClick={pauseRecording} variant="outline">
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </Button>
                    )}

                    <Button onClick={transcribeAudio} disabled={isTranscribing}>
                      {isTranscribing ? "Transcribing..." : "Transcribe"}
                    </Button>

                    <Button onClick={deleteRecording} variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <audio ref={audioRef} className="hidden" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Transcription */}
          <Card>
            <CardHeader>
              <CardTitle>Transcription</CardTitle>
            </CardHeader>
            <CardContent>
              {!transcription && !isTranscribing && (
                <div className="text-center py-12 text-slate-500">
                  <Mic className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Record your voice and click "Transcribe" to see your words here</p>
                </div>
              )}

              {isTranscribing && (
                <div className="text-center py-12">
                  <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-slate-600">Converting your speech to text...</p>
                </div>
              )}

              {transcription && (
                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-lg p-4 min-h-[200px]">
                    <p className="text-slate-800 leading-relaxed">{transcription}</p>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button onClick={saveEntry} className="bg-green-600 hover:bg-green-700">
                      <Save className="w-4 h-4 mr-2" />
                      Save as Journal Entry
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tips */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="font-semibold text-slate-800 mb-3">Tips for better voice recordings:</h3>
            <ul className="space-y-2 text-slate-600">
              <li>• Find a quiet space to minimize background noise</li>
              <li>• Speak clearly and at a normal pace</li>
              <li>• Hold your device about 6 inches from your mouth</li>
              <li>• Take pauses between thoughts for better transcription</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
