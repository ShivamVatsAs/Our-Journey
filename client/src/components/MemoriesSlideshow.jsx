import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getMemories, uploadMemory, generateCaptionForMemory } from '../services/memoryService';
import { useAuth } from '../context/AuthContext';
import { ChevronLeft, ChevronRight, Plus, Image as ImageIcon, Loader2, Sparkles } from 'lucide-react';

const MemoriesSlideshow = () => {
  const { user } = useAuth();
  // The state now holds the full memory objects, not just image URLs
  const [memories, setMemories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [file, setFile] = useState(null);

  const fetchAllMemories = useCallback(async () => {
    try {
      const personalMemories = await getMemories();
      // Shuffle the memories for a nice mix
      const shuffled = personalMemories.sort(() => 0.5 - Math.random());
      setMemories(shuffled);
    } catch (error) {
      console.error("Failed to load memories:", error);
    }
  }, []);

  useEffect(() => {
    fetchAllMemories();
  }, [fetchAllMemories]);

  // Slideshow auto-play logic
  useEffect(() => {
    if (memories.length > 1) {
      const timer = setTimeout(() => {
        const nextIndex = (currentIndex + 1) % memories.length;
        setCurrentIndex(nextIndex);
      }, 7000); // Increased time to 7 seconds to allow reading the caption
      return () => clearTimeout(timer);
    }
  }, [currentIndex, memories.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % memories.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + memories.length) % memories.length);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadError('');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadError('Please select a photo to upload.');
      return;
    }
    setIsUploading(true);
    setUploadError('');
    const formData = new FormData();
    formData.append('image', file);
    formData.append('uploadedBy', user);

    try {
      await uploadMemory(formData);
      setFile(null);
      document.getElementById('file-upload').value = '';
      await fetchAllMemories();
    } catch (error) {
      setUploadError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleGenerateCaption = async () => {
      const currentMemory = memories[currentIndex];
      if (!currentMemory) return;
      
      setIsGenerating(true);
      try {
          const updatedMemory = await generateCaptionForMemory(currentMemory._id, currentMemory.imageUrl);
          // Update the specific memory in our state with the new caption
          setMemories(memories.map(mem => mem._id === updatedMemory._id ? updatedMemory : mem));
      } catch (error) {
          console.error("Caption generation failed", error);
      } finally {
          setIsGenerating(false);
      }
  };

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0 }),
  };

  const currentMemory = memories[currentIndex];

  return (
    <div className="bg-white/50 p-6 rounded-2xl shadow-lg shadow-rose-100 space-y-4">
      {/* Slideshow Display */}
      <div className="relative w-full overflow-hidden rounded-lg bg-gray-200 aspect-video">
        {memories.length > 0 ? (
          <AnimatePresence initial={false}>
            <motion.img
              key={currentIndex}
              src={currentMemory.imageUrl}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              className="absolute h-full w-full object-contain"
              alt="Memory"
            />
          </AnimatePresence>
        ) : (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>
        )}
        {memories.length > 1 && (
          <>
            <div className="absolute top-1/2 left-4 -translate-y-1/2 z-10">
              <button onClick={handlePrev} className="bg-white/50 hover:bg-white p-2 rounded-full transition"><ChevronLeft /></button>
            </div>
            <div className="absolute top-1/2 right-4 -translate-y-1/2 z-10">
              <button onClick={handleNext} className="bg-white/50 hover:bg-white p-2 rounded-full transition"><ChevronRight /></button>
            </div>
          </>
        )}
      </div>

      {/* Caption and Generate Button */}
      <div className="text-center min-h-[6rem] flex flex-col items-center justify-center p-4">
        {currentMemory && (
          isGenerating ? (
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          ) : (
            <>
              <p className="font-display text-2xl text-secondary italic">
                  {currentMemory.caption || "A beautiful memory."}
              </p>
              <button onClick={handleGenerateCaption} className="mt-2 flex items-center text-sm text-primary hover:underline">
                  <Sparkles className="w-4 h-4 mr-1" />
                  Write a new line for us
              </button>
            </>
          )
        )}
      </div>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="flex flex-col sm:flex-row items-center gap-4 p-4 border-t border-rose-100">
        <label htmlFor="file-upload" className="flex-grow w-full sm:w-auto cursor-pointer flex items-center justify-center px-4 py-2 border-2 border-dashed border-secondary/50 rounded-lg text-secondary hover:bg-rose-50 hover:border-primary transition">
          <ImageIcon className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">{file ? file.name : 'Choose a photo'}</span>
          <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
        </label>
        <button type="submit" disabled={isUploading || !file} className="w-full sm:w-auto flex items-center justify-center bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-red-500 transition disabled:bg-red-300 disabled:cursor-not-allowed">
          {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
          <span className="ml-2">Add Memory</span>
        </button>
      </form>
      {uploadError && <p className="text-sm text-red-600 text-center">{uploadError}</p>}
    </div>
  );
};

export default MemoriesSlideshow;