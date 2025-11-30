import React from "react";
import { motion } from "framer-motion";
import {
  Stethoscope,
  HeartPulse,
  Users,
  Building2,
  ShieldCheck,
  ArrowRight,
  Pill,
  Calendar,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* ---------------- NAVBAR ---------------- */}
      <nav className="w-full py-5 px-8 flex justify-between items-center bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
            <HeartPulse className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-blue-700">HealCare+</h1>
        </div>

        <div className="flex items-center space-x-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-600 transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-600 transition">
            Contact
          </Link>

          <Link
            to="/login"
            className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/login?mode=signup"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Signup
          </Link>
        </div>
      </nav>

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* ---------- LEFT CONTENT ---------- */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Transforming Healthcare <br />
              <span className="text-blue-600">with Smart Technology</span>
            </h1>

            <p className="text-gray-600 text-lg max-w-md">
              “The greatest medicine of all is teaching people how not to need
              it.”
            </p>

            <p className="text-blue-700 font-semibold">— Hippocrates</p>

            <div className="flex space-x-4 pt-4">
              <a
                href="/login"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-blue-700 transition"
              >
                Get Started →
              </a>

              <a
                href="#about"
                className="border border-blue-400 text-blue-600 px-6 py-3 rounded-lg text-lg hover:bg-blue-50 transition"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* ---------- RIGHT ILLUSTRATION ---------- */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex justify-center"
          >
            <img
              src="/src/assets/hospital-3d.png"
              alt="Hospital 3D"
              className="w-[420px] md:w-[480px] drop-shadow-2xl rounded-xl"
            />
          </motion.div>
        </div>
      </section>
      {/* ---------------- STATISTICS SECTION ---------------- */}
      <section className="py-16 bg-blue-50/60 border-t border-blue-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          <StatCard icon={<Users />} number="15,000+" label="Patients Served" />
          <StatCard
            icon={<Building2 />}
            number="80+"
            label="Partner Hospitals"
          />
          <StatCard
            icon={<ShieldCheck />}
            number="500+"
            label="Verified Nurses"
          />
        </div>
      </section>

      {/* ---------------- FEATURES SECTION ---------------- */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Why Choose <span className="text-blue-600">HealCare+</span>?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard
            icon={<HeartPulse className="text-blue-600" />}
            title="Improved Patient Care"
            desc="Monitor, track, and manage patient data efficiently with our intuitive dashboards."
          />

          <FeatureCard
            icon={<Calendar className="text-green-600" />}
            title="Smart Appointments"
            desc="Seamless scheduling for doctors, nurses, and hospital admins."
          />

          <FeatureCard
            icon={<Activity className="text-red-600" />}
            title="Real-Time Analytics"
            desc="Insights and reports to help hospitals make smarter decisions."
          />
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-blue-600 text-white py-6 mt-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} HealCare+. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

/* ---------------- REUSABLE COMPONENTS ---------------- */

const StatCard = ({ icon, number, label }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="bg-white border border-blue-200 shadow-md rounded-xl p-6 text-center"
  >
    <div className="flex justify-center mb-3 text-blue-600">{icon}</div>
    <h3 className="text-3xl font-bold text-gray-800">{number}</h3>
    <p className="text-gray-600 mt-1">{label}</p>
  </motion.div>
);

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ scale: 1.04 }}
    className="bg-white p-6 rounded-xl shadow-md border border-blue-100 text-center"
  >
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </motion.div>
);

export default LandingPage;
