import React from "react";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 px-6 py-20">
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-blue-700 mb-10"
      >
        About HealCare+
      </motion.h1>

      <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-lg p-10 rounded-2xl shadow-xl border border-blue-100">
        <p className="text-gray-700 text-lg leading-relaxed">
          HealCare+ is a next-generation healthcare workflow platform designed
          to simplify daily operations across hospitals. From patient monitoring
          to nurse assignments and admin analytics, our system is built to make
          healthcare smoother, faster, and more efficient.
        </p>

        <ul className="mt-8 space-y-3 text-gray-700 text-lg">
          <li>✔ Seamless cross-role communication</li>
          <li>✔ Smart dashboards with analytics</li>
          <li>✔ Real-time patient status updates</li>
          <li>✔ Secure authentication system</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;
