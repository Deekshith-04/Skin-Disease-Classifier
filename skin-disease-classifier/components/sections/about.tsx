'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Brain, Microscope, Zap } from 'lucide-react'

export function About() {
  const benefits = [
    'Convolutional Neural Network (CNN) architecture',
    'Trained on HAM10000 public research dataset',
    'Image preprocessing and feature extraction',
    'Classification of 7 pigmented skin lesion types',
    'Confidence scores and probability distributions',
    'Educational and research purposes only',
  ]

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                About This Project
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed">
                This project uses a Convolutional Neural Network (CNN) trained on the HAM10000 dataset for skin lesion classification. It demonstrates deep learning and computer vision applications in medical image analysis.
              </p>
            </div>

            <p className="text-gray-400 leading-relaxed">
              Built with Next.js, React, and TypeScript, this application showcases how AI can assist in dermatological assessment. The model processes images through preprocessing, feature extraction, and CNN-based classification to provide confidence scores for each disease category.
            </p>

            <motion.div
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  variants={itemVariants}
                >
                  <CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={20} />
                  <span className="text-muted-foreground">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm p-8 lg:p-12">
              {/* Background gradient circles */}
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-3xl -z-10"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 blur-3xl -z-10"></div>

              {/* Stats */}
              <div className="space-y-8">
                <div>
                  <div className="text-4xl font-bold text-white">
                    ~90%
                  </div>
                  <p className="text-gray-400 mt-2">Model Accuracy</p>
                </div>

                <div>
                  <div className="text-4xl font-bold text-white">
                    10,015
                  </div>
                  <p className="text-gray-400 mt-2">HAM10000 Images</p>
                </div>

                <div>
                  <div className="text-4xl font-bold text-white">
                    7
                  </div>
                  <p className="text-gray-400 mt-2">Disease Classes</p>
                </div>

                <div>
                  <div className="text-4xl font-bold text-white">
                    CNN
                  </div>
                  <p className="text-gray-400 mt-2">Deep Learning Model</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
