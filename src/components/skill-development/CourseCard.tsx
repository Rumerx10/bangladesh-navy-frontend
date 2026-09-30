"use client";

import { ICourse } from "@/src/components/skill-development/types";
import { motion } from "framer-motion";
import { Clock, GraduationCap, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  course: ICourse;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-card/90 backdrop-blur-md text-pBlue text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
            {course.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-secondary-foreground mb-3">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-blue-500" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1.5">
            <GraduationCap size={14} className="text-blue-500" />
            Official Certification
          </div>
        </div>

        <h3 className="text-xl font-bold text-pBlue mb-3 group-hover:text-liteBlue transition-colors line-clamp-2">
          {course.title}
        </h3>

        <p className="text-sm text-secondary-foreground mb-6 line-clamp-3 leading-relaxed">
          {course.shortDescription}
        </p>

        <Link
          href={`/skill-development/${course.slug}`}
          className="inline-flex items-center gap-2 text-pBlue font-bold text-sm group/link"
        >
          View Details
          <ArrowRight
            size={18}
            className="transition-transform group-hover/link:translate-x-1"
          />
        </Link>
      </div>
    </motion.div>
  );
};

export default CourseCard;
