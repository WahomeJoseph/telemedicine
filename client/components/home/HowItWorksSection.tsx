"use client";

import { motion } from "framer-motion";

const process = [
  {
    step: "01",
    title: "Choose Your Care Type",
    description:
      "Select virtual or in-person based on your needs. Not sure? Our intake form will recommend the best option.",
  },
  {
    step: "02",
    title: "See a Doctor",
    description:
      "Get matched with an available provider. Virtual patients connect in under 15 minutes walk-ins are seen same-day.",
  },
  {
    step: "03",
    title: "Get Your Care Plan",
    description:
      "Receive your diagnosis, prescriptions, lab orders, or specialist referral - all documented in your secure patient portal.",
  },
  {
    step: "04",
    title: "Follow-Up & Support",
    description:
      "We check in after your visit. Need a referral? We coordinate with partner specialists and transfer your records seamlessly.",
  },
];

export function HowItWorksSection() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
      <div
        className="hidden lg:block absolute top-12 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent"
        aria-hidden="true"
      />

      {process.map((item, i) => (
        <motion.div
          key={item.step}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="text-center relative"
        >
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shadow-lg relative overflow-hidden">
            <div
              className="absolute top-1 right-1 w-6 h-6 bg-white/10 rounded-full"
              aria-hidden="true"
            />
            <span className="text-lg font-bold text-white relative z-10">
              {item.step}
            </span>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {item.title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed max-w-[220px] mx-auto">
            {item.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
