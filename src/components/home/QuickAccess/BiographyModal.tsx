import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Ship, X } from "lucide-react";
import { chiefMessage } from "@/src/data/homeData";
import Link from "next/link";

function renderParagraph(para: string) {
  if (para.includes("Military Institute of Science and Technology (MIST)")) {
    return (
      <>
        {para.split("Military Institute of Science and Technology (MIST)")[0]}
        <Link
          href="https://mist.ac.bd/"
          target="_blank"
          className="text-liteBlue font-semibold underline underline-offset-4 hover:text-blue-600 transition-colors"
        >
          Military Institute of Science and Technology (MIST)
        </Link>
        {para.split("Military Institute of Science and Technology (MIST)")[1]}
      </>
    );
  }
  return para;
}

const BiographyModal = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-pBlue/60 backdrop-blur-md"
        onClick={closeModal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Modal Header */}
        <div className="relative bg-linear-to-r from-pBlue to-liteBlue px-6 sm:px-10 py-6 sm:py-8 shrink-0">
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10">
            <Ship size={80} className="text-white" />
          </div>
          <div className="relative flex items-start gap-5">
            <div className="hidden sm:block relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/30 shrink-0">
              <Image
                src="/CHIEF.jpeg"
                alt={chiefMessage.name}
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-0.5 bg-white/40" />
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
                  Full Biography
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {chiefMessage.name}
              </h3>
              <p className="text-sm text-blue-200/80 mt-1">
                {chiefMessage.designation}
              </p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="crusor-pointer absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-200"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="scrollbar-modern flex-1 overflow-y-auto px-4 lg:px-6 py-4 lg:py-6">
          <Quote size={40} className="text-pBlue/20 mb-4" />
          <div className="space-y-6">
            {chiefMessage.content.map((para, i) => (
              <motion.p
                key={i}
                className="text-base lg:text-lg text-gray-600 text-justify leading-relaxed font-light"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              >
                {renderParagraph(para)}
              </motion.p>
            ))}
          </div>
          <div className="mt-10 pt-8 border-t border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-pBlue">
                {chiefMessage.name}
              </p>
              <p className="text-sm text-liteBlue font-medium tracking-wide uppercase mt-1">
                {chiefMessage.designation}
              </p>
            </div>
            <div className="w-14 h-14 rounded-full border-2 border-dashed border-pBlue/20 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-pBlue/5 flex items-center justify-center text-pBlue font-bold text-sm">
                BN
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BiographyModal;
