
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react'; // Using MessageSquare as a generic WhatsApp icon

const WhatsAppButton = ({ phoneNumber }) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center hover:bg-green-600 transition-colors"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageSquare size={28} />
    </motion.a>
  );
};

export default WhatsAppButton;
