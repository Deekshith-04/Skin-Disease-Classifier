'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { WORKFLOW_STEPS } from '@/utils/constants'

export default function AnalyzingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Simulate workflow steps - each takes 0.5-1 second
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < WORKFLOW_STEPS.length - 1) {
          return prev + 1
        } else {
          setIsComplete(true)
          return prev
        }
      })
    }, 600)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Redirect to results after workflow completes
    if (isComplete) {
      const timer = setTimeout(() => {
        router.push('/results')
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isComplete, router])

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
      <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-2 text-4xl font-bold text-foreground">
            {isComplete ? 'Analysis Complete!' : 'Analyzing Image'}
          </h1>
          <p className="text-muted-foreground">
            {isComplete
              ? 'Generating results...'
              : `Step ${currentStep + 1} of ${WORKFLOW_STEPS.length}`}
          </p>
        </motion.div>

        {/* Workflow Steps */}
        <div className="space-y-6">
          {WORKFLOW_STEPS.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.max(0, idx * 0.1 - 0.5) }}
              className="flex gap-4"
            >
              {/* Step Number */}
              <div className="flex flex-col items-center">
                <motion.div
                  animate={
                    idx <= currentStep
                      ? { scale: 1, backgroundColor: 'rgb(59, 130, 246)' }
                      : { scale: 1, backgroundColor: 'rgb(226, 232, 240)' }
                  }
                  className="flex h-12 w-12 items-center justify-center rounded-full font-bold text-sm transition-colors"
                >
                  {idx <= currentStep ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={
                        idx === currentStep
                          ? { duration: 1, repeat: Infinity }
                          : { duration: 0 }
                      }
                      className="text-white"
                    >
                      ✓
                    </motion.div>
                  ) : (
                    <span className="text-muted-foreground">{step.step}</span>
                  )}
                </motion.div>
                {idx < WORKFLOW_STEPS.length - 1 && (
                  <motion.div
                    animate={
                      idx < currentStep
                        ? { scaleY: 1, backgroundColor: 'rgb(59, 130, 246)' }
                        : { scaleY: 1, backgroundColor: 'rgb(226, 232, 240)' }
                    }
                    className="mt-2 h-8 w-0.5 origin-top transition-colors"
                  />
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 pt-1">
                <motion.div
                  animate={
                    idx <= currentStep
                      ? { opacity: 1, color: 'rgb(15, 23, 42)' }
                      : { opacity: 0.5, color: 'rgb(100, 116, 139)' }
                  }
                  className="transition-colors"
                >
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </motion.div>

                {/* Loading Animation */}
                {idx === currentStep && idx < WORKFLOW_STEPS.length - 1 && (
                  <motion.div className="mt-2 flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ scaleY: [1, 1.5, 1] }}
                        transition={{ delay: i * 0.15, duration: 0.8, repeat: Infinity }}
                        className="h-2 w-1 rounded-full bg-primary"
                      />
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <motion.div className="mt-12 h-1 w-full rounded-full bg-muted overflow-hidden">
          <motion.div
            animate={{ width: `${((currentStep + 1) / WORKFLOW_STEPS.length) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-primary"
          />
        </motion.div>

        {/* Status Text */}
        <motion.p
          animate={{ opacity: isComplete ? 1 : 0.6 }}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          {isComplete
            ? 'Results are ready. Redirecting...'
            : 'Processing your dermatoscopic image with our CNN model...'}
        </motion.p>
      </div>
    </main>
  )
}
