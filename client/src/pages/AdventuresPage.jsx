import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAdventures, createAdventure } from '../services/adventureService';
import { Plus, Loader2, Image as ImageIcon, Send } from 'lucide-react';
import AdventureCard from '../components/AdventureCard';

const AdventuresPage = () => {
  const [adventures, setAdventures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState("Places We'll Go");
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchAdventures = async () => {
    try {
      setIsLoading(true);
      const data = await getAdventures();
      setAdventures(data);
    } catch (err) {
      setError('Could not load your adventures. Please try refreshing.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdventures();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title || !description) {
      setError('Please fill out all fields and select an image.');
      return;
    }
    setIsSubmitting(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('image', file);

    try {
      await createAdventure(formData);
      // Reset form and hide it
      setTitle('');
      setDescription('');
      setCategory("Places We'll Go");
      setFile(null);
      setIsFormVisible(false);
      // Refresh the adventures list
      await fetchAdventures();
    } catch (err) {
      setError('Failed to add adventure. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Memoize the filtering of adventures to prevent recalculation on every render
  const { places, tastes } = useMemo(() => {
    const places = adventures.filter(adv => adv.category === "Places We'll Go");
    const tastes = adventures.filter(adv => adv.category === "Tastes We'll Share");
    return { places, tastes };
  }, [adventures]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="font-display text-5xl text-primary">Our Adventures</h1>
        <p className="text-text-light mt-2">The digital dream board for our future together.</p>
      </div>

      {/* Add New Adventure Button and Form */}
      <div className="text-center">
        <AnimatePresence>
          {isFormVisible && (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mb-8 space-y-4"
            >
              <h3 className="font-display text-2xl text-secondary">Add a New Dream</h3>
              <input type="text" placeholder="Dream Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded-md" required />
              <textarea placeholder="Description..." value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border rounded-md" rows="3" required></textarea>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2 border rounded-md">
                <option>Places We'll Go</option>
                <option>Tastes We'll Share</option>
              </select>
              <label htmlFor="adventure-file" className="w-full flex items-center justify-center p-2 border-2 border-dashed rounded-md cursor-pointer text-gray-500 hover:bg-gray-50">
                <ImageIcon className="w-5 h-5 mr-2" /> {file ? file.name : 'Select an image'}
              </label>
              <input type="file" id="adventure-file" onChange={e => setFile(e.target.files[0])} className="sr-only" accept="image/*" />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center p-2 bg-primary text-white rounded-md hover:bg-red-500 transition disabled:bg-red-300">
                {isSubmitting ? <Loader2 className="animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
                Add to Board
              </button>
            </motion.form>
          )}
        </AnimatePresence>
        
        <motion.button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="bg-accent text-text-main font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-transform"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="inline -mt-1 mr-2" />
          {isFormVisible ? 'Close Form' : 'Add New Adventure'}
        </motion.button>
      </div>

      {/* Adventures Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-16 h-16 text-primary animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Column 1: Places We'll Go */}
          <div className="space-y-8">
            <h2 className="font-display text-4xl text-center text-secondary">Places We'll Go</h2>
            {places.length > 0 ? (
                places.map((adv, index) => <AdventureCard key={adv._id} adventure={adv} index={index} />)
            ) : <p className="text-center text-text-light">Our travel list is empty. Let's add a destination!</p>}
          </div>
          {/* Column 2: Tastes We'll Share */}
          <div className="space-y-8">
            <h2 className="font-display text-4xl text-center text-secondary">Tastes We'll Share</h2>
            {tastes.length > 0 ? (
                tastes.map((adv, index) => <AdventureCard key={adv._id} adventure={adv} index={index} />)
            ) : <p className="text-center text-text-light">Our food list is empty. Let's add a culinary dream!</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdventuresPage;