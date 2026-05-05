"use client";

import { motion } from "framer-motion";
import { Building, Users } from "lucide-react";

const departments = [
  { name: "Hydrographic Survey Wing", description: "Conducts systematic hydrographic surveys of Bangladesh waters" },
  { name: "Nautical Chart Production Wing", description: "Produces and maintains paper and electronic nautical charts" },
  { name: "Oceanographic Division", description: "Conducts oceanographic research and tidal observations" },
  { name: "Data Management Division", description: "Manages geospatial data and GIS systems" },
  { name: "Training & Development", description: "Provides hydrographic training and skill development" },
  { name: "Administration & Finance", description: "Manages administrative and financial operations" },
];

export default function Organization() {
  return (
    <section className="py-8 lg:py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Leadership */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 rounded-full bg-[#001836] flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            CH
          </div>
          <h2 className="text-xl font-bold text-[#001836]">
            Chief Hydrographer
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Bangladesh Navy Hydrographic and Oceanographic Center
          </p>
        </motion.div>

        {/* Departments */}
        <h3 className="text-lg font-bold text-[#001836] mb-5 flex items-center gap-2">
          <Building size={20} />
          Departments & Divisions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map((dept, i) => (
            <motion.div
              key={i}
              className="rounded-xl border border-gray-100 bg-white p-5 hover:shadow-md hover:border-[#003f71]/15 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="w-10 h-10 rounded-lg bg-[#003f71]/10 text-[#003f71] flex items-center justify-center mb-3">
                <Users size={18} />
              </div>
              <h4 className="text-sm font-semibold text-[#001836]">
                {dept.name}
              </h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                {dept.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
