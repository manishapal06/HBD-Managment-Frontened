import React from "react";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-20">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-gray-800 mb-6"
      >
        Welcome to <span className="text-blue-600">HealCare+</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 text-center max-w-3xl mx-auto text-lg"
      >
        A smart healthcare management platform designed to connect patients,
        nurses, hospital admins and super admins—bringing efficiency and
        simplicity to healthcare workflows.
      </motion.p>
    </div>
  );
};

export default HomePage;
