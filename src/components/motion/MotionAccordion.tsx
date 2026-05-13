"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { motionDurations, motionEases } from "@/lib/motion";

interface AccordionItem {
  question: string;
  answer: string;
}

interface MotionAccordionProps {
  items: AccordionItem[];
  className?: string;
  defaultOpen?: number | null;
}

export function MotionAccordion({
  items,
  className,
  defaultOpen = 0,
}: MotionAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  const id = useId();

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `${id}-panel-${index}`;
        const buttonId = `${id}-button-${index}`;

        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-2xl border border-[#DEDBD2] bg-white"
          >
            <button
              id={buttonId}
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex min-h-[56px] w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm font-bold text-[#101010] md:px-8 md:text-base"
              aria-expanded={open}
              aria-controls={panelId}
            >
              <span>{item.question}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 flex-shrink-0 text-[#B88A44] transition-transform duration-200",
                  open && "rotate-180"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: motionDurations.accordionOpen,
                    ease: motionEases.mainEase,
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-sm leading-relaxed text-[#6F6B63] md:px-8 md:text-base">
                    {item.answer}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
