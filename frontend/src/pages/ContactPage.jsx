import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-6 py-20">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-gray-800 mb-10"
      >
        Contact Us
      </motion.h1>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <ContactCard
          icon={<Mail className="w-8 h-8 text-blue-600" />}
          title="Email"
          desc="support@healcare.com"
        />

        <ContactCard
          icon={<Phone className="w-8 h-8 text-green-600" />}
          title="Phone"
          desc="+91 98765 43210"
        />

        <ContactCard
          icon={<MapPin className="w-8 h-8 text-red-600" />}
          title="Address"
          desc="Hyderabad, Telangana"
        />
      </div>
    </div>
  );
};

const ContactCard = ({ icon, title, desc }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="p-6 bg-white shadow-lg rounded-xl border border-blue-100 text-center"
  >
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    <p className="text-gray-600 mt-1">{desc}</p>
  </motion.div>
);

export default ContactPage;
