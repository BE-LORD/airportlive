'use client';

import { faqs } from '@/data/faqs';
import { getWhatsAppLink } from '@/lib/links';
import { Reveal } from '@/components/motion/Reveal';
import { SplitTextReveal } from '@/components/motion/SplitTextReveal';
import { MotionAccordion } from '@/components/motion/MotionAccordion';
import { MotionButton } from '@/components/motion/MotionButton';

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-[#111111]">
      <div className="max-w-3xl mx-auto px-4">
        <Reveal className="text-center mb-16" y={20}>
          <p className="text-[#E5E4E2] uppercase tracking-[0.2em] text-xs font-mono mb-4 font-bold">Common Questions</p>
          <h2 className="text-4xl md:text-5xl font-serif text-[#F5F5F5]">
            <SplitTextReveal text="Frequently Asked" highlight="Asked" />
          </h2>
        </Reveal>
        <MotionAccordion items={faqs.map((faq) => ({ question: faq.question, answer: faq.answer }))} />
        <Reveal className="text-center mt-12" y={16}>
          <p className="text-[#A3A3A3] mb-4 text-sm">Still have questions?</p>
          <MotionButton
            href={getWhatsAppLink("Hi V3 Tour & Travels, I have a question regarding...")}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            showArrow
          >
            Ask on WhatsApp
          </MotionButton>
        </Reveal>
      </div>
    </section>
  );
}
