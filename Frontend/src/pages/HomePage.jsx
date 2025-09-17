import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Add animation

// SVG Icons remain the same
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.417V21h18v-.583c0-3.46-1.6-6.634-4.382-8.433z" />
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default function HomePage() {
  return (
    <div className="font-sans text-gray-800 leading-relaxed">

      {/* Hero Section */}
      <section className="text-center py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <div className="container mx-auto px-6">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-pulse">Report Issues, Drive Change</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-90">
              Your unified platform to report <span className="font-bold underline">cyber crime</span> and <span className="font-bold underline">civic issues</span> in <span className="italic">Howrah, West Bengal</span> with real-time updates from authorities.
            </p>
            <Link
              to="/report/new"
              className="bg-white text-blue-700 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl hover:bg-blue-100 transition-all transform hover:scale-105"
            >
              File a Report Now
            </Link>
          </div>
        </motion.div>
      </section>

      {/* What to Report Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">What Can You Report?</h2>
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer">
              <ShieldIcon />
              <h3 className="text-2xl font-semibold mb-4">Cyber Crime</h3>
              <p className="text-gray-600 text-md">
                Report UPI scams, phishing links, online harassment, and other digital frauds quickly and securely.
              </p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer">
              <MapPinIcon />
              <h3 className="text-2xl font-semibold mb-4">Civic Issues</h3>
              <p className="text-gray-600 text-md">
                Notify municipal authorities about potholes, water logging, broken streetlights, or garbage overflow.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">A Simple, Transparent Process</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="text-4xl font-bold text-blue-400 mb-4">1</div>
              <h3 className="text-xl font-semibold mb-3">Quick Report</h3>
              <p className="text-gray-600">Submit your issue in under 2 minutes through our simplified, intuitive form.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-green-50 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="text-4xl font-bold text-green-400 mb-4">2</div>
              <h3 className="text-xl font-semibold mb-3">Live Tracking</h3>
              <p className="text-gray-600">Monitor the status of your complaint in real-time right from your personal dashboard.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-purple-50 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="text-4xl font-bold text-purple-400 mb-4">3</div>
              <h3 className="text-xl font-semibold mb-3">Get Resolution</h3>
              <p className="text-gray-600">Receive updates and notifications as authorities take action and resolve your case.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-teal-600 text-white text-center">
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-md md:text-lg mb-8 opacity-90">Your report is the first step towards a safer and better community.</p>
          <Link
            to="/login"
            className="bg-white text-green-600 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl hover:bg-green-100 transition-all transform hover:scale-105"
          >
            Get Started
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
