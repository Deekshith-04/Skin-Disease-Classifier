'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Download, ArrowRight, AlertCircle } from 'lucide-react'
import { DISEASES, type Disease } from '@/utils/constants'
//import jsPDF from "jspdf"
//import autoTable from "jspdf-autotable"


export default function ResultsPage() {
  const [imagePreview, setImagePreview] = useState<string>('')
  const [disease, setDisease] = useState<Disease | null>(null)
  const [prediction, setPrediction] = useState<any>(null)
  useEffect(() => {
    const historyResult =
      sessionStorage.getItem('historyResult')
      if (
        historyResult &&
        historyResult !== 'undefined'
      ) {
      try {
        const data = JSON.parse(historyResult)
        setPrediction(data.prediction)
        setDisease(data.disease)
        setImagePreview(data.imagePreview)
        sessionStorage.removeItem('historyResult')
        return
      } 
      catch (error) {
        console.error(error)
      }
    }
    if (
      historyResult &&
      historyResult !== 'undefined'
    ) {
      try {
        const data = JSON.parse(historyResult)

        setPrediction(data.prediction)
        setDisease(data.disease)
        setImagePreview(data.imagePreview)

        sessionStorage.removeItem('historyResult')

        return
      } catch (error) {
        console.error(error)
      }
    }
    const storedImage =
      sessionStorage.getItem('uploadedImage')
      if (storedImage) {
      setImagePreview(storedImage)
      }
    const storedPrediction =
      sessionStorage.getItem('prediction')
    if (
      storedPrediction &&
      storedPrediction !== 'undefined'
    ) {
    try {
      const pred = JSON.parse(storedPrediction)
      setPrediction(pred)
          const diseaseMap: any = {
            "Melanoma": "mel",
            "Melanocytic Nevus": "nv",
            "Basal Cell Carcinoma": "bcc",
            "Actinic Keratoses": "akiec",
            "Benign Keratosis": "bkl",
            "Dermatofibroma": "df",
            "Vascular Lesion": "vasc"
          }
          const diseaseId = diseaseMap[pred.prediction]
          const matchedDisease = DISEASES.find(
            d => d.id === diseaseId
          )
          setDisease(matchedDisease || null)
          const history = JSON.parse(
            localStorage.getItem('analysisHistory') || '[]'
          )
          history.push({
            prediction: pred.prediction,
            confidence: pred.confidence,
            timestamp: new Date().toLocaleString(),
            resultData: {
              prediction: pred,
              disease: matchedDisease,
              imagePreview: storedImage
            }
          })
          localStorage.setItem(
            'analysisHistory',
            JSON.stringify(history)
          )
        } catch (error) {
      console.error("Invalid prediction data:", error)
      sessionStorage.removeItem("prediction")
    }
    }
    }, [])

//  const handleDownloadPDF = () => {
//  if (!prediction) return

//  const doc = new jsPDF()

//  doc.setFontSize(20)
//  doc.text("Skin Disease Analysis Report", 20, 20)

//  doc.setFontSize(12)
//  doc.text(`Prediction: ${prediction.prediction}`, 20, 40)
//  doc.text(`Confidence: ${prediction.confidence}%`, 20, 50)

//  const rows = Object.entries(prediction.probabilities).map(
//    ([name, value]: any) => [
//      name,
//     `${Number(value).toFixed(2)}%`
//    ]
//  )

// autoTable(doc, {
//    startY: 65,
//    head: [["Disease", "Probability"]],
//    body: rows,
//  })

//  doc.save("Skin_Disease_Report.pdf")
//}

  const handleAnalyzeAgain = () => {
    sessionStorage.removeItem('uploadedImage')
    sessionStorage.removeItem('prediction')
    sessionStorage.removeItem('historyResult')

    window.location.href = '/upload'
  }

  // Guard against null disease
  if (!disease) {
  return (
    <main className="min-h-screen bg-background">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-xl rounded-2xl border bg-card p-8 shadow-sm">

          <h1 className="mb-4 text-3xl font-bold text-red-500">
            ⚠ Invalid Image
          </h1>

          <p className="mb-6 text-muted-foreground">
            We could not identify a valid skin lesion from the uploaded image.
          </p>

          <h2 className="mb-3 font-semibold">
            Possible Reasons:
          </h2>

          <ul className="mb-6 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>Blurry image</li>
            <li>Non-skin image uploaded</li>
            <li>Poor lighting conditions</li>
            <li>Skin lesion is too far away</li>
            <li>Image quality is too low</li>
          </ul>

          <button
            onClick={() => window.location.href = "/upload"}
            className="rounded-lg bg-primary px-4 py-2 text-white"
          >
            Try Again
          </button>

        </div>
      </div>
    </main>
  )
}

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-lg font-bold text-primary">
              Skin Disease Classifier
            </Link>
            <div className="flex gap-2">
              <button
                onClick={handleAnalyzeAgain}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
              >
                Analyze Another
              </button>

              <Link
                href="/history"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
              >
                View History
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Results Container */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Medical Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4"
        >
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-yellow-700 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <strong>Educational Use Only:</strong> This analysis is for educational and research purposes. It is not a medical diagnosis.
            Always consult a qualified dermatologist for professional medical advice.
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left: Image Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 text-sm font-semibold text-foreground">Uploaded Image</h3>
              <div className="aspect-square w-full rounded-lg border border-border bg-muted overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="Uploaded skin lesion" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-muted">
                    <span className="text-sm text-muted-foreground">No image preview</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Center: Prediction Card & Charts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Predicted Disease Card */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Predicted Disease</h3>
              <div className={`rounded-lg ${disease.riskColor} p-4`}>
                <div className="text-sm font-medium mb-1">{disease.name}</div>
                <div className="text-xs opacity-75">{disease.shortName} - {disease.riskLevel} Risk</div>
              </div>
            </div>

            {/* Confidence Gauge */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 text-sm font-semibold text-foreground">Confidence Score</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{prediction?.confidence ?? 0}%</div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${prediction?.confidence ?? 0}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Probability Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 text-sm font-semibold text-foreground">All Predictions</h3>
              <div className="space-y-3">
                {prediction &&
                Object.entries(prediction.probabilities).map(
                ([name, value]: any, idx) => (
                  <div key={name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-foreground">
                        {name === "akiec" ? "Actinic Keratoses" :
                        name === "bcc" ? "Basal Cell Carcinoma" :
                        name === "bkl" ? "Benign Keratosis" :
                        name === "df" ? "Dermatofibroma" :
                        name === "mel" ? "Melanoma" :
                        name === "nv" ? "Melanocytic Nevus" :
                        name === "vasc" ? "Vascular Lesion" :
                        name}
                      </span>
                      <span className="text-muted-foreground">
                        {Number(value).toFixed(2)}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ delay: idx * 0.05 + 0.3, duration: 0.5 }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Disease Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 grid gap-8 lg:grid-cols-2"
        >
          {/* Description & Symptoms */}
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-3 text-lg font-semibold text-foreground">About {disease.name}</h3>
              <p className="text-sm text-foreground leading-relaxed">{disease.description}</p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Common Symptoms</h3>
              <ul className="space-y-2">
                {disease.symptoms.map((symptom, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-foreground">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    {symptom}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommendations */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Recommendations</h3>
            <div className="space-y-3">
              {disease.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-lg bg-secondary/30 p-3">
                  <div className="mt-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground flex-shrink-0">
                    {idx + 1}
                  </div>
                  <span className="text-sm text-foreground">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex flex-col gap-4 sm:flex-row"
        >
          <button
            onClick={() => alert("Coming Soon")}
            className="flex items-center justify-center gap-2 rounded-lg border border-primary bg-transparent px-6 py-3"
          >
            <Download size={18} />
            Download PDF Report
          </button>
          <Link
            href={`/diseases/${disease.id}`}
            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Learn More About {disease.shortName}
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
