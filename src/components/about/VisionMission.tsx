"use client";

import { visionMissionItems } from "@/src/data/aboutData";
import { motion } from "framer-motion";
import { Check, Eye, Target } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  eye: <Eye size={24} />,
  target: <Target size={24} />,
};

export default function VisionMission() {
  return (
    <section className="py-8 lg:py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {visionMissionItems.map((item, i) => (
            <motion.div
              key={item.id}
              className="rounded-2xl border border-gray-100 bg-white p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="w-14 h-14 rounded-xl bg-[#003f71]/10 text-[#003f71] flex items-center justify-center mb-5">
                {iconMap[item.icon] ?? <Eye size={24} />}
              </div>
              <h2 className="text-xl font-bold text-[#001836] mb-3">
                {item.title}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {item.description}
              </p>
              {item.points && (
                <ul className="space-y-2">
                  {item.points.map((point, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 text-sm text-gray-600"
                    >
                      <Check
                        size={16}
                        className="text-emerald-500 mt-0.5 shrink-0"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
