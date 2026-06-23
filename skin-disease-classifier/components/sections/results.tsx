'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, AlertCircle, Info } from 'lucide-react'

interface ResultsProps {
  imageUrl?: string
  onClose?: () => void
}

export function Results({ imageUrl, onClose }: ResultsProps) {
  // Mock analysis result - this would be replaced with real API response
  const result = {
    disease: 'Moderate Acne',
    confidence: 87,
    severity: 'moderate',
    symptoms: [
      'Blackheads and whiteheads',
      'Small red bumps',
      'Occasional inflammation',
      'Mild oiliness',
    ],
    precautions: [
      'Wash face twice daily with gentle cleanser',
      'Avoid touching or picking at affected areas',
      'Use non-comedogenic moisturizers',
      'Apply sunscreen with SPF 30+',
      'Consider consulting a dermatologist',
    ],
    nextSteps: [
      'Schedule a dermatology consultation',
      'Try over-the-counter acne treatments',
      'Maintain a consistent skincare routine',
      'Track changes over 4-6 weeks',
    ],
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild':
        return 'from-green-400 to-green-600'
      case 'moderate':
        return 'from-yellow-400 to-yellow-600'
      case 'severe':
        return 'from-red-400 to-red-600'
      default:
        return 'from-blue-400 to-blue-600'
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <div className="min-h-screen py-12 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          onClick={onClose}
          className="mb-6 text-primary hover:text-primary/80 font-semibold transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          ← Back
        </motion.button>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Image Preview */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            {imageUrl ? (
              <div className="rounded-lg overflow-hidden border border-border/50 bg-card">
                <img src={imageUrl} alt="Analysis" className="w-full h-80 object-cover" />
              </div>
            ) : (
              <div className="rounded-lg border-2 border-dashed border-border flex items-center justify-center h-80 bg-muted/50">
                <p className="text-muted-foreground">Image preview</p>
              </div>
            )}
          </motion.div>

          {/* Analysis Results */}
          <motion.div className="lg:col-span-2 space-y-6" variants={containerVariants}>
            {/* Main Result */}
            <motion.div className="p-6 rounded-lg border border-border/50 bg-card" variants={itemVariants}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Analysis Result</p>
                  <h2 className="text-3xl font-bold">{result.disease}</h2>
                </div>
                <div className={`flex-shrink-0 px-4 py-2 rounded-lg bg-gradient-to-r ${getSeverityColor(result.severity)} text-white font-semibold`}>
                  {result.confidence}%
                </div>
              </div>

              {/* Confidence Bar */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Confidence Level</p>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${getSeverityColor(result.severity)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${result.confidence}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Symptoms */}
            <motion.div className="p-6 rounded-lg border border-border/50 bg-card" variants={itemVariants}>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <AlertCircle className="text-yellow-500" size={20} />
                Common Symptoms
              </h3>
              <ul className="space-y-2">
                {result.symptoms.map((symptom, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></span>
                    {symptom}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Precautions */}
            <motion.div className="p-6 rounded-lg border border-border/50 bg-card" variants={itemVariants}>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <CheckCircle2 className="text-green-500" size={20} />
                Precautions & Care
              </h3>
              <ul className="space-y-2">
                {result.precautions.map((precaution, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0"></span>
                    {precaution}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Disclaimer */}
            <motion.div
              className="p-4 rounded-lg border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/30"
              variants={itemVariants}
            >
              <div className="flex gap-3">
                <Info className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>Important:</strong> This analysis is for informational purposes only and should not replace professional medical diagnosis. Please consult a licensed dermatologist for proper evaluation and treatment.
                </p>
              </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div className="p-6 rounded-lg border border-border/50 bg-card" variants={itemVariants}>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <AlertTriangle className="text-orange-500" size={20} />
                Recommended Next Steps
              </h3>
              <ol className="space-y-2">
                {result.nextSteps.map((step, index) => (
                  <li key={index} className="flex gap-3 text-muted-foreground">
                    <span className="font-semibold text-primary flex-shrink-0">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </motion.div>

            {/* Action Buttons */}
            <motion.div className="flex gap-4 pt-4" variants={itemVariants}>
              <button className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
                New Analysis
              </button>
              <button className="flex-1 px-6 py-3 rounded-lg border border-primary/50 text-primary hover:bg-primary/10 font-semibold transition-all duration-300">
                Download Report
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
