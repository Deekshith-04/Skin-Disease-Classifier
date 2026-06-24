'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Upload, Camera, AlertCircle } from 'lucide-react'

export default function UploadPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (cameraActive && stream && videoRef.current) {
      videoRef.current.srcObject = stream
    }
  }, [cameraActive, stream])

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageData = e.target?.result as string
        setPreview(imageData)
        sessionStorage.setItem('uploadedImage', imageData)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
  }

  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) handleFileSelect(file)
  }

  const startCamera = async () => {
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
    })

    setStream(mediaStream)
    setCameraActive(true)
  } catch (err) {
    alert('Unable to access camera')
  }
}

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        ctx.drawImage(videoRef.current, 0, 0)
        const imageData = canvasRef.current.toDataURL('image/png')
        setPreview(imageData)
        sessionStorage.setItem('uploadedImage', imageData)
        stopCamera()
      }
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(track => track.stop())
      setCameraActive(false)
    }
  }

  const handleAnalyze = async () => {
  if (!preview) {
    alert('Please upload an image')
    return
  }

  setIsLoading(true)

  try {
    const response = await fetch(preview)
    const blob = await response.blob()

    const formData = new FormData()
    formData.append('file', blob, 'image.png')

    const result = await fetch(
      'https://skin-disease-classifier-t3d1.onrender.com/predict',
      {
        method: 'POST',
        body: formData,
      }
    )

    const prediction = await result.json()
    console.log("Prediction:", prediction)
    sessionStorage.setItem(
      'prediction',
      JSON.stringify(prediction)
    )
    const history = JSON.parse(
      localStorage.getItem('analysisHistory') || '[]'
    )

    history.unshift({
      prediction: prediction.prediction,
      confidence: prediction.confidence,
      timestamp: new Date().toLocaleString(),

      resultData: {
        prediction: prediction,
        imagePreview: preview
      }
    })

    localStorage.setItem(
      'analysisHistory',
      JSON.stringify(history.slice(0, 10))
    )
    router.push('/analyzing')
  } catch (error) {
    console.error(error)
    alert('Prediction failed')
  } finally {
    setIsLoading(false)
  }
}
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-lg font-bold text-primary">
            Skin Disease Classifier
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-2 text-3xl font-bold text-foreground">Upload Skin Image</h1>
          <p className="mb-8 text-muted-foreground">
            Upload a dermatoscopic image or capture one with your device camera for AI-powered analysis
          </p>
        </motion.div>

        {/* Medical Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4"
        >
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-yellow-700 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <strong>Disclaimer:</strong> This tool is for educational purposes only and not intended as medical advice.
            Always consult a qualified dermatologist for professional diagnosis.
          </div>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* File Upload */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDragDrop}
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer rounded-lg border-2 border-dashed border-border bg-secondary/20 p-8 text-center hover:border-primary hover:bg-secondary/40 transition-all"
          >
            <Upload className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-2 text-lg font-semibold text-foreground">Upload Image</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Drag and drop your image here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground">JPG, PNG, or WebP • Max 10MB</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
          </motion.div>

          {/* Camera Capture */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg border border-border bg-card p-8 text-center"
          >
            <Camera className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-2 text-lg font-semibold text-foreground">Capture Photo</h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Use your device camera to take a photo
            </p>
            <button
              onClick={cameraActive ? stopCamera : startCamera}
              className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {cameraActive ? 'Stop Camera' : 'Start Camera'}
            </button>
          </motion.div>
        </div>

        {/* Camera Preview */}
        {cameraActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-lg border border-border bg-card overflow-hidden"
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full"
            />
            <div className="flex gap-4 p-4">
              <button
                onClick={capturePhoto}
                className="flex-1 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Capture Photo
              </button>
              <button
                onClick={stopCamera}
                className="flex-1 rounded-lg border border-border px-4 py-2 font-medium text-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Image Preview */}
        {preview && !cameraActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <img src={preview} alt="Preview" className="w-full h-auto" />
            </div>
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => {
                  setPreview(null)
                  sessionStorage.removeItem('uploadedImage')
                }}
                className="flex-1 rounded-lg border border-border px-4 py-2 font-medium text-foreground hover:bg-muted transition-colors"
              >
                Choose Different Image
              </button>
              <button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="flex-1 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                {isLoading ? 'Analyzing...' : 'Analyze Image'}
              </button>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!preview && !cameraActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <div className="text-6xl mb-4">📸</div>
            <p className="text-muted-foreground">Upload or capture an image to get started</p>
          </motion.div>
        )}

        {/* Canvas for camera capture (hidden) */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </main>
  )
}