'use client'

import { motion } from 'framer-motion'
import { DISEASES } from '@/utils/constants'
import { AlertCircle, TrendingUp } from 'lucide-react'

export function Dataset() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High':
        return 'bg-red-500/20 text-red-300 border-red-500/30'
      case 'Medium':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'Low':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300'
    }
  }

  return (
    <section id="dataset" className="relative py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            HAM10000 Dataset
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            The Human Against Machine with 10,000 Training Images dataset contains dermatoscopic images of common pigmented skin lesions. Our model classifies these 7 disease categories:
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {DISEASES.map((disease, i) => (
            <motion.div
              key={disease.id}
              variants={itemVariants}
              className="group rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:border-white/20 hover:bg-white/10 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {disease.name}
                  </h3>
                  <p className="text-sm text-gray-500 font-mono">{disease.code}</p>
                </div>
              </div>

              {/* Risk Level Badge */}
              <div className="mb-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getRiskColor(
                    disease.riskLevel,
                  )}`}
                >
                  {disease.riskLevel} Risk
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-400 line-clamp-3">
                {disease.description}
              </p>

              {/* Symptoms Preview */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-gray-500 font-semibold mb-2">
                  Key Symptoms:
                </p>
                <ul className="text-xs text-gray-400 space-y-1">
                  {disease.symptoms.slice(0, 2).map((symptom, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-white/40"></span>
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Medical Disclaimer */}
        <motion.div
          className="mt-16 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-6 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex gap-4">
            <AlertCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-200 mb-2">
                Medical Disclaimer
              </h4>
              <p className="text-sm text-yellow-100">
                This tool is intended for educational and research purposes only and should not replace professional medical diagnosis. Always consult with a qualified dermatologist for medical advice and treatment.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
