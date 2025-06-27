'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import FeaturesStacked from './components/FeaturesStacked';


export default function HomePage() {
  const router = useRouter();
  const swiperRef = useRef(null); // ✅ Correct useRef

  return (
    <>
      {/* Hero Section */}
<div className="relative min-h-screen w-full overflow-hidden">
  {/* Text & Button */}
  <div className="relative z-30 flex flex-col items-center justify-start min-h-[60vh] text-center px-4 pt-28">
    <h1
      style={{ fontFamily: 'var(--font-manrope)' }}
      className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)] mb-6"
    >
      Smart. Secure.
      <br />
      Structured.
    </h1>

    <button
      onClick={() => router.push('#upload')}
      style={{ fontFamily: 'var(--font-manrope)' }}
      className="group inline-flex items-center gap-2 px-6 md:px-8 py-2 
        bg-white/10 hover:bg-white/20 text-white 
        text-sm md:text-base font-semibold 
        rounded-full shadow-lg 
        transition-all duration-300 
        ring-1 ring-white/10 hover:ring-white/20 backdrop-blur-md"
    >
      Try Now
      <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
    </button>

    <p
      style={{ fontFamily: 'var(--font-nunito)' }}
      className="text-sm md:text-lg mt-4 text-white/80 max-w-2xl"
    >
      Upload any business document and get structured, secure contact data instantly using AI.
    </p>
  </div>

  {/* Background/Preview Video
  <div className="relative z-10 w-full mt-16">
    <video
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-auto max-h-[600px] object-cover"
    >
      <source src="/videos/demo.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
  */}
</div>


      {/* Features Section */}
      <FeaturesStacked />

      {/* Company Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h3
              style={{ fontFamily: 'var(--font-manrope)' }}
              className="text-3xl md:text-4xl font-semibold mb-4"
            >
              Sentienta Quality AI
            </h3>
            <p
              style={{ fontFamily: 'var(--font-nunito)' }}
              className="text-base md:text-lg text-white/80 leading-relaxed max-w-md mx-auto md:mx-0"
            >
              Built to assist legal firms, MSMEs, and enterprises in transforming unstructured documents
              into usable contact data. Secure. Fast. AI-powered.
            </p>
          </div>

          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <img
              src="/images/logo.png"
              alt="Document Parsing Animation"
              className="w-[520px] md:w-[220px] object-contain rounded-xl drop-shadow-xl"
            />
          </div>
        </div>
      </section>
    </>
  );
}
