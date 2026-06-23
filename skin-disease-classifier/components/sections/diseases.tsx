'use client'

import { motion } from 'framer-motion'

const diseases = [
  {
    name: 'Acne',
    description: 'Common skin condition characterized by blocked pores and inflammation.',
    severity: 'Mild to Moderate',
    color: 'from-blue-400 to-blue-600',
  },
  {
    name: 'Eczema',
    description: 'Inflammatory condition causing dry, itchy, and irritated skin.',
    severity: 'Moderate',
    color: 'from-purple-400 to-purple-600',
  },
  {
    name: 'Psoriasis',
    description: 'Autoimmune condition causing red, scaly patches on the skin.',
    severity: 'Moderate to Severe',
    color: 'from-pink-400 to-pink-600',
  },
  {
    name: 'Ringworm',
    description: 'Fungal infection causing ring-shaped rash on the skin.',
    severity: 'Mild to Moderate',
    color: 'from-amber-400 to-amber-600',
  },
  {
    name: 'Melanoma',
    description: 'Serious form of skin cancer requiring immediate medical attention.',
    severity: 'Severe',
    color: 'from-red-400 to-red-600',
  },
  {
    name: 'Vitiligo',
    description: 'Condition causing loss of skin pigmentation in patches.',
    severity: 'Mild to Moderate',
    color: 'from-gray-400 to-gray-600',
  },
]

export function Diseases() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
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

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">Detectable Conditions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI is trained to identify over 100 different skin conditions. Here are some of the most common.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {diseases.map((disease, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-card hover:border-primary/50 transition-all duration-300 p-6"
              variants={itemVariants}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${disease.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`}></div>

              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-gradient-to-r ${disease.color} text-white`}>
                {disease.severity}
              </div>

              <h3 className="font-bold text-xl mb-2">{disease.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{disease.description}</p>

              <div className="mt-4 pt-4 border-t border-border/30">
                <button className="text-primary text-sm font-semibold hover:text-primary/80 transition-colors">
                  Learn More →
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
