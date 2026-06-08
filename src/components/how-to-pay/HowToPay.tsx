"use client";

import { motion } from "framer-motion";
import { CreditCard, Landmark, ShieldCheck } from "lucide-react";

const paymentMethods = [
  {
    icon: Landmark,
    title: "Bank Transfer (BEFTN / RTGS)",
    description:
      "Transfer directly to our account via Bangladesh Electronic Funds Transfer Network (BEFTN) or Real Time Gross Settlement (RTGS).",
    steps: [
      "Obtain a proforma invoice from BNHOC",
      "Transfer the exact amount to the designated bank account",
      "Email the payment receipt to bnhoc@navy.mil.bd",
      "Your order will be processed within 2 working days of payment confirmation",
    ],
    account: {
      bankName: "Sonali Bank Limited",
      branch: "Agrabad Branch, Chattogram",
      accountName: "Bangladesh Navy Hydrographic & Oceanographic Center",
      accountNo: "Please contact BNHOC for account details",
    },
  },
  {
    icon: CreditCard,
    title: "Online Payment",
    description:
      "Pay securely online using debit / credit card or mobile banking (bKash, Nagad, Rocket) through our checkout.",
    steps: [
      "Add your items to the cart and proceed to checkout",
      "Select your preferred online payment method",
      "Complete payment via the secure payment gateway",
      "You will receive an order confirmation by email",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HowToPay() {
  return (
    <main>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#001836] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-125 h-125 bg-blue-500 rounded-full blur-[120px] -mr-64 -mt-64" />
          <div className="absolute bottom-0 left-0 w-100 h-100 bg-cyan-500 rounded-full blur-[100px] -ml-48 -mb-48" />
        </div>

        <div className="relative container px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-bold uppercase tracking-widest mb-6">
              <ShieldCheck size={16} />
              Secure &amp; Trusted
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              How to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Pay
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Choose from multiple secure payment options to purchase BNHOC
              publications, charts, and services. All transactions are processed
              with full government compliance.
            </p>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white overflow-hidden">
          <svg
            viewBox="0 0 1440 120"
            className="absolute bottom-0 w-full h-full text-white fill-current"
            preserveAspectRatio="none"
          >
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#001836] mb-3">
              Available Payment Methods
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Select the method most convenient for you. All amounts are in BDT
              unless otherwise specified.
            </p>
          </div>

          <motion.div
            className="grid gap-6 sm:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={method.title}
                  variants={cardVariants}
                  className="rounded-2xl border border-gray-200 p-6 lg:p-8 hover:shadow-lg hover:border-[#003f71]/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-[#003f71]/10 text-[#003f71] flex items-center justify-center">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-base lg:text-lg font-semibold text-[#001836] mb-1">
                        {method.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {method.description}
                      </p>
                    </div>
                  </div>

                  <ol className="space-y-2.5 mb-5">
                    {method.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-[#003f71] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-gray-600 leading-relaxed">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>

                  {method.account && (
                    <div className="rounded-xl bg-[#003f71]/5 border border-[#003f71]/10 p-4 text-sm space-y-1.5">
                      <p className="font-semibold text-[#003f71] mb-2">
                        Bank Account Details
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium text-gray-700">Bank:</span>{" "}
                        {method.account.bankName}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium text-gray-700">
                          Branch:
                        </span>{" "}
                        {method.account.branch}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium text-gray-700">
                          Account Name:
                        </span>{" "}
                        {method.account.accountName}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium text-gray-700">
                          Account No:
                        </span>{" "}
                        {method.account.accountNo}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Help Banner */}
      <section className="py-14 bg-[#003f71]">
        <div className="container px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">
            Need Assistance with Payment?
          </h3>
          <p className="text-blue-200 mb-6 max-w-lg mx-auto text-sm">
            Our team is available Sunday – Thursday, 09:00–17:00 (BST) to
            assist you with any payment queries.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/90">
            <span>
              📧{" "}
              <a
                href="mailto:bnhoc@navy.mil.bd"
                className="underline underline-offset-2 hover:text-white"
              >
                bnhoc@navy.mil.bd
              </a>
            </span>
            <span className="hidden sm:block text-white/30">|</span>
            <span>
              📞{" "}
              <a
                href="tel:+8801769722446"
                className="underline underline-offset-2 hover:text-white"
              >
                +880 1769 722446
              </a>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
