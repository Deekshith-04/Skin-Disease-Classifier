'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react'
import { DISEASES } from '@/utils/constants'

export default function DiseasePage() {
  const params = useParams()
  const diseaseId = params.id as string

  const disease = DISEASES.find(d => d.id === diseaseId)

  if (!disease) {
    return (
      <main className="min-h-screen bg-background">
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-lg font-bold text-primary">
              SkinAI
            </Link>
          </div>
        </header>
        <div className="flex h-96 items-center justify-center">
          <p className="text-muted-foreground">Disease not found</p>
        </div>
      </main>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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
            <Link
              href="/upload"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Analyze
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </motion.div>

        {/* Title & Risk Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="mb-2 text-4xl font-bold text-foreground">{disease.name}</h1>
              <p className="text-lg text-muted-foreground">Code: {disease.shortName}</p>
            </div>
            <span className={`inline-block rounded-lg px-4 py-2 font-semibold text-sm ${disease.riskColor} flex-shrink-0`}>
              {disease.riskLevel} Risk
            </span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 rounded-lg border border-border bg-card p-6"
        >
          <h2 className="mb-4 text-xl font-semibold text-foreground">Overview</h2>
          <p className="text-base text-foreground leading-relaxed">{disease.description}</p>
        </motion.div>

        {/* Two Column Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:grid-cols-2"
        >
          {/* Symptoms */}
          <motion.div
            variants={itemVariants}
            className="rounded-lg border border-border bg-card p-6"
          >
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
              <AlertCircle size={24} className="text-primary" />
              Common Symptoms
            </h2>
            <ul className="space-y-3">
              {disease.symptoms.map((symptom, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-foreground">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  {symptom}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            variants={itemVariants}
            className="rounded-lg border border-border bg-card p-6"
          >
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
              <CheckCircle size={24} className="text-primary" />
              Recommendations
            </h2>
            <ul className="space-y-3">
              {disease.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-3 rounded-lg bg-secondary/30 p-3">
                  <div className="mt-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground flex-shrink-0">
                    {idx + 1}
                  </div>
                  <span className="text-sm text-foreground">{rec}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Dataset Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 rounded-lg border border-border bg-secondary/10 p-6"
        >
          <h3 className="mb-3 font-semibold text-foreground">Dataset Information</h3>
          <p className="text-sm text-muted-foreground">
            This disease classification is based on the HAM10000 dataset. {disease.name} represents approximately{' '}
            <strong>{disease.percentage}%</strong> of the training dataset, containing high-quality dermatoscopic
            images used for model training and validation.
          </p>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="mb-4 text-muted-foreground">Have a skin lesion you&apos;d like to analyze?</p>
          <Link
            href="/upload"
            className="inline-block rounded-lg bg-primary px-8 py-3 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Get Analysis
          </Link>
        </motion.div>

        {/* Related Diseases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 border-t border-border pt-12"
        >
          <h3 className="mb-6 text-xl font-semibold text-foreground">Other Disease Classes</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {DISEASES.filter(d => d.id !== disease.id)
              .slice(0, 3)
              .map((d) => (
                <Link
                  key={d.id}
                  href={`/diseases/${d.id}`}
                  className="rounded-lg border border-border bg-card p-4 hover:border-primary hover:shadow-md transition-all"
                >
                  <h4 className="font-semibold text-foreground mb-1">{d.name}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{d.shortName}</p>
                  <span className={`inline-block rounded px-2 py-1 text-xs font-semibold ${d.riskColor}`}>
                    {d.riskLevel}
                  </span>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>
    </main>
  )
}
