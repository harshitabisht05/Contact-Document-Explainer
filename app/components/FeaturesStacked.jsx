'use client';

import { motion } from 'framer-motion';

const features = [
  {
    icon: '📄',
    image: '/images/features/pdf.png',
    title: 'Multi-format Document Input',
    description:
      'Supports PDF, TXT, and OCR-based image files. Works seamlessly for invoices, emails, or letters.',
  },
  {
    icon: '🧠',
    image: '/images/features/llm.png',
    title: 'AI-Powered Entity Extraction',
    description:
      'Leverages GPT-4-turbo or Mistral to extract names, emails, phone numbers, companies, roles, and addresses.',
  },
  {
    icon: '🛡️',
    image: '/images/features/security.png',
    title: 'In-Memory & Secure',
    description:
      'Files are processed in memory only. No data is stored. AES-256 integration ready.',
  },
  {
    icon: '🔁',
    image: '/images/features/fallback.png',
    title: 'Regex-based Fallback Parsing',
    description:
      'Handles incomplete cases with regex backup for names, emails, and phone numbers.',
  },
  {
    icon: '📤',
    image: '/images/features/export.png',
    title: 'Multi-format Export',
    description:
      'Export extracted data as JSON, CSV, or TXT summary reports, ready for integration.',
  },
];

export default function FeaturesStacked() {
  return (
    <section
      id="features"
      className="w-full py-24 px-6 text-white bg-[url('/images/noise.png')] bg-cover bg-center"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:items-center">
        {/* Left Heading Section */}
        <div className="md:w-1/3">
          <h2
            style={{ fontFamily: 'var(--font-manrope)' }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Why Use Contact Document Explainer?
          </h2>
          <p
            style={{ fontFamily: 'var(--font-nunito)' }}
            className="text-white/80 text-base md:text-lg"
          >
            Extract structured, secure contact data from any document — fast, private, and AI-driven.
          </p>
        </div>

        {/* Right Features List */}
        <div className="md:w-2/3 flex flex-col space-y-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: false, amount: 0.4 }}
              className="backdrop-blur-lg bg-white/10 border border-white/10 p-8 md:p-10 rounded-3xl shadow-xl transition min-h-fit"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-500 text-white flex items-center justify-center rounded-full text-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-manrope)' }} className="text-lg font-semibold mb-1">{feature.title}</h3>
                  <p style={{ fontFamily: 'var(--font-nunito)' }} className="text-white/80 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
