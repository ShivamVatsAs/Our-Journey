import React from 'react';
import { motion } from 'framer-motion';

const AdventureCard = ({ adventure, index }) => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Card Image */}
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
        <img
          src={adventure.imageUrl}
          alt={adventure.title}
          // --- CHANGE HERE ---
          // Changed 'object-cover' to 'object-contain' and added a max-height
          className="w-full h-full object-contain"
          // Add a fallback in case the image link breaks
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src="https://placehold.co/600x400/FFF8F0/E57373?text=Our+Dream";
          }}
        />
      </div>
      {/* Card Content */}
      <div className="p-6">
        <h3 className="font-display text-3xl text-primary mb-2">{adventure.title}</h3>
        <p className="text-text-light text-base leading-relaxed">
          {adventure.description}
        </p>
      </div>
    </motion.div>
  );
};

export default AdventureCard;
