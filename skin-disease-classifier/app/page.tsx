'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Brain, Zap, Upload, TrendingUp, FileText, Lock, AlertCircle, History } from 'lucide-react'
import { DISEASES, STATS, FEATURES } from '@/utils/constants'

export default function HomePage() {
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
      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold text-primary">Skin Disease Classifier</h1>
            <Link
              href="/upload"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Analyze Now
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-5xl font-bold text-foreground sm:text-6xl">
              AI-Powered Skin Disease Classification
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Upload a dermatoscopic image and receive instant AI-powered classification using a deep learning model
              trained on the HAM10000 dataset with 7 pigmented skin lesion categories.
            </p>

            {/* Stats */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {[
                { label: 'Disease Classes', value: STATS.diseaseClasses },
                { label: 'Training Images', value: STATS.trainingImages.toLocaleString() },
                { label: 'Model Type', value: STATS.modelType },
                { label: 'Accuracy', value: STATS.accuracy },
              ].map((stat, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-4 sm:flex-row sm:justify-center"
            >
              <Link
                href="/upload"
                className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-white hover:bg-primary/90"              >
                <Upload size={20} />
                Get Started
              </Link>
              <a
                href="#dataset"
                className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-white hover:bg-primary/90"              >
                Learn More
                <ArrowRight size={20} />
              </a>
              <Link
                href="/history"
                className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-white hover:bg-primary/90"              >
                History
                <History size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-3xl font-bold text-foreground"
          >
            Why Use Skin Disease Classifier?
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-3"
          >
            {FEATURES.map((feature, i) => {
              const IconComponent = {
                Brain,
                Zap,
                Upload,
                TrendingUp,
                FileText,
                Lock,
              }[feature.icon] || Brain

              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 hover:shadow-md transition-all"
                >
                  <IconComponent className="mb-4 h-8 w-8 text-primary" />
                  <h3 className="mb-2 font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Dataset Section */}
      <section id="dataset" className="border-t border-border px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-3xl font-bold text-foreground"
          >
            HAM10000 Dataset Classes
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Disease</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Code</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Risk Level</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Dataset %</th>
                  <th className="px-4 py-3 text-center font-semibold text-foreground">Details</th>
                </tr>
              </thead>
              <tbody>
                {DISEASES.map((disease) => (
                  <motion.tr
                    key={disease.id}
                    variants={itemVariants}
                    className="border-b border-border hover:bg-secondary/30 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-foreground">{disease.name}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{disease.shortName}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded px-2 py-1 text-xs font-semibold ${disease.riskColor}`}>
                        {disease.riskLevel}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{disease.percentage}%</td>
                    <td className="px-4 py-3 text-center">
                      <Link
                        href={`/diseases/${disease.id}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Learn
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="border-t border-border px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-3xl font-bold text-foreground"
          >
            How It Works
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              { title: 'Upload Image', desc: 'Upload or capture a dermatoscopic image' },
              { title: 'AI Processing', desc: 'CNN model analyzes the image' },
              { title: 'Get Results', desc: 'Receive classification and confidence scores' },
              { title: 'Learn More', desc: 'Explore detailed disease information' },
            ].map((step, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex gap-4 rounded-lg border border-border bg-card p-6"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="border-t border-border px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-lg border border-yellow-200 bg-yellow-50 p-6">
          <div className="flex gap-3">
            <AlertCircle className="h-6 w-6 flex-shrink-0 text-yellow-700 mt-0.5" />
            <div>
              <h3 className="mb-2 font-semibold text-yellow-900">Educational Use Only</h3>
              <p className="text-sm text-yellow-800 leading-relaxed">
                This application is designed for educational and research purposes only. It is not intended to be used
                as a medical diagnosis tool. The classifications provided are for informational purposes and should not be
                relied upon for medical decision-making. Always consult with a qualified dermatologist or healthcare
                provider for professional medical advice, diagnosis, and treatment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center text-sm text-muted-foreground">
          <p>
            Built with Next.js, React, and TensorFlow.js | HAM10000 Dataset | CNN Deep Learning Model
          </p>
          <p className="mt-2">Educational AI Application for Dermatology Research</p>
        </div>
      </footer>
    </main>
  )
}
