"use client";

import { ICourse } from "@/src/components/skill-development/types";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  ChevronRight, 
  Calendar,
  User,
  GraduationCap
} from "lucide-react";
import Image from "next/image";

interface CourseDetailsProps {
  course: ICourse;
}

export default function CourseDetails({ course }: CourseDetailsProps) {
  return (
    <div className="bg-white">
      {/* Dynamic Header/Banner for Course */}
      <section className="relative h-[400px] lg:h-[500px] flex items-end">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001836] via-[#001836]/60 to-transparent" />
        <div className="relative container px-4 sm:px-6 lg:px-8 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="px-3 py-1 bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-4 inline-block">
              {course.category}
            </span>
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6 max-w-4xl">
              {course.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-blue-400" />
                <span className="text-sm font-medium">{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={20} className="text-blue-400" />
                <span className="text-sm font-medium">{course.instructor || "BN Expert Panel"}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap size={20} className="text-blue-400" />
                <span className="text-sm font-medium">Official BN Certification</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Left Content */}
            <div className="flex-1">
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#001836] mb-6 flex items-center gap-3">
                  <BookOpen className="text-blue-600" />
                  Course Overview
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg italic border-l-4 border-blue-500 pl-6 mb-8">
                  {course.shortDescription}
                </p>
                <div className="prose prose-blue max-w-none text-gray-600">
                  <p>{course.longDescription}</p>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#001836] mb-6">What You Will Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.learningOutcomes.map((outcome, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100"
                    >
                      <CheckCircle2 className="text-blue-600 mt-0.5 shrink-0" size={18} />
                      <span className="text-sm text-gray-700 font-medium">{outcome}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#001836] mb-8">Course Plan & Curriculum</h2>
                <div className="space-y-4">
                  {course.coursePlan.map((step, index) => (
                    <motion.div 
                      key={index}
                      className="group flex gap-4 lg:gap-6"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-[#001836] text-white flex items-center justify-center font-bold text-sm z-10">
                          {step.week}
                        </div>
                        {index !== course.coursePlan.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-100 group-hover:bg-blue-200 transition-colors" />
                        )}
                      </div>
                      <div className="flex-1 pb-10">
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 group-hover:border-blue-200 group-hover:shadow-md transition-all">
                          <h4 className="font-bold text-[#001836] mb-2 flex items-center justify-between">
                            Week {step.week}: {step.title}
                            <span className="text-[10px] uppercase text-blue-500 font-bold bg-blue-50 px-2 py-1 rounded">Module {index + 1}</span>
                          </h4>
                          <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar - Enrollment/Quick Info */}
            <div className="lg:w-96">
              <div className="sticky top-32 space-y-6">
                <div className="bg-[#001836] rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                  {/* Decorative circles */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
                  
                  <h3 className="text-xl font-bold mb-6">Enroll in this Course</h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-white/60 text-sm">Duration</span>
                      <span className="font-bold">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-white/60 text-sm">Start Date</span>
                      <span className="font-bold">Contact for intake</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-white/60 text-sm">Level</span>
                      <span className="font-bold">Professional</span>
                    </div>
                  </div>
                  
                  <button className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 cursor-pointer">
                    Apply Now
                  </button>
                  <p className="text-[10px] text-white/40 text-center mt-4 uppercase tracking-widest font-medium">
                    Limited seats available for each batch
                  </p>
                </div>

                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                  <h4 className="font-bold text-[#001836] mb-4">Requirements</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-xs text-gray-500">
                      <ChevronRight size={14} className="text-blue-500 mt-0.5" />
                      Naval Executive Branch or Maritime Professional
                    </li>
                    <li className="flex items-start gap-2 text-xs text-gray-500">
                      <ChevronRight size={14} className="text-blue-500 mt-0.5" />
                      Basic Mathematics & Physics Knowledge
                    </li>
                    <li className="flex items-start gap-2 text-xs text-gray-500">
                      <ChevronRight size={14} className="text-blue-500 mt-0.5" />
                      Proficiency in English
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
