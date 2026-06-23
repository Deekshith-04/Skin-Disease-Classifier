'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Camera, Upload, Zap } from 'lucide-react'
import Link from 'next/link'
import { STATS } from '@/utils/constants'

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section id="home" className="relative pt-20 pb-32 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white/5 blur-3xl opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl sm:text-6xl font-bold text-balance leading-tight text-white">
              AI-Powered Skin Disease Classification
            </h1>
          </motion.div>

          <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Upload a dermatoscopic skin image and receive instant AI-powered classification using a deep learning model trained on the HAM10000 dataset.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            variants={itemVariants}
          >
            <button className="px-8 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2">
              <Upload size={20} />
              Upload Image
            </button>
            <button className="px-8 py-3 rounded-lg border border-white/30 text-white hover:bg-white/10 font-semibold transition-all duration-300 flex items-center gap-2">
              <Camera size={20} />
              Take Photo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12"
            variants={itemVariants}
          >
            {[
              { label: 'Disease Classes', value: STATS.diseaseClasses },
              { label: 'Training Images', value: STATS.trainingImages.toLocaleString() },
              { label: 'Model Type', value: STATS.modelType },
              { label: 'Accuracy', value: STATS.accuracy },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
