'use client'

import { motion } from 'framer-motion'
import { Upload, Camera, AlertCircle } from 'lucide-react'
import { useState, useRef } from 'react'

export function Analysis() {
  const [preview, setPreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showCamera, setShowCamera] = useState(false)
  const [streamActive, setStreamActive] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setShowCamera(true)
        setStreamActive(true)
      }
    } catch (err) {
      console.error('[v0] Camera access denied:', err)
      alert('Unable to access camera. Please check permissions.')
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      setShowCamera(false)
      setStreamActive(false)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0)
        setPreview(canvas.toDataURL('image/jpeg'))
        stopCamera()
      }
    }
  }

  const handleAnalyze = async () => {
    if (!preview) return

    setIsAnalyzing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsAnalyzing(false)
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">Quick Analysis</h2>
          <p className="text-lg text-muted-foreground">
            Upload an image or take a photo to begin your skin analysis
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Upload Area */}
          <div className="space-y-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative border-2 border-dashed border-primary/30 rounded-xl p-8 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300 cursor-pointer group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="text-primary" size={24} />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">Upload Image</p>
                  <p className="text-sm text-muted-foreground">or drag and drop</p>
                </div>
              </div>
            </div>

            <button
              onClick={showCamera ? stopCamera : startCamera}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-primary/50 text-primary hover:bg-primary/10 font-semibold transition-all duration-300"
            >
              <Camera size={20} />
              {showCamera ? 'Close Camera' : 'Take Photo'}
            </button>

            {/* Camera View */}
            {showCamera && (
              <div className="relative rounded-xl overflow-hidden bg-black">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={capturePhoto}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  Capture
                </button>
              </div>
            )}

            {/* Alert */}
            <div className="flex gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50">
              <AlertCircle className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" size={18} />
              <div className="text-sm text-blue-800 dark:text-blue-300">
                Ensure good lighting and take a clear photo for best results.
              </div>
            </div>
          </div>

          {/* Preview Area */}
          <div className="space-y-4">
            {preview ? (
              <motion.div
                className="relative rounded-xl overflow-hidden bg-muted border border-border"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img src={preview} alt="Preview" className="w-full h-64 object-cover" />
              </motion.div>
            ) : (
              <div className="w-full h-64 rounded-xl border-2 border-dashed border-border flex items-center justify-center bg-muted/50">
                <p className="text-muted-foreground text-center">Image preview will appear here</p>
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={!preview || isAnalyzing}
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Image'
              )}
            </button>

            <p className="text-xs text-muted-foreground text-center">
              Your image is processed securely and not stored permanently.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
