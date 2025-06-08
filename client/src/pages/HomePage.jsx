import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Gift, Clock, Pencil, Save } from 'lucide-react';
import CountdownTimer from '../components/CountdownTimer';
import MemoriesSlideshow from '../components/MemoriesSlideshow';
import { getCountdownDate, setCountdownDate } from '../services/countdownService';

const HomePage = () => {
  const [targetDate, setTargetDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newDate, setNewDate] = useState('');

  // Function to calculate the days you've been together
  const getDaysTogether = () => {
    const startDate = new Date('2025-05-10T00:00:00');
    const today = new Date();
    const timeDifference = today.getTime() - startDate.getTime();
    return Math.floor(timeDifference / (1000 * 3600 * 24));
  };

  // Function to fetch the shared countdown date from the server
  const fetchDate = useCallback(async () => {
    setIsLoading(true);
    const data = await getCountdownDate();
    if (data) {
      setTargetDate(data.targetDate);
      // Format the date for the datetime-local input field
      const localDate = new Date(data.targetDate);
      // Adjust for timezone offset to display correctly in the input
      localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
      setNewDate(localDate.toISOString().slice(0, 16));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchDate();
  }, [fetchDate]);

  // Function to handle saving the new date
  const handleSaveDate = async () => {
    if (newDate) {
      await setCountdownDate(newDate);
      setIsEditing(false);
      await fetchDate(); // Re-fetch the date to update the view
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="space-y-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
        {/* Days We've Shared */}
        <motion.div 
          className="bg-white/50 p-8 rounded-2xl shadow-lg shadow-rose-100 animate-slide-in-bottom"
          style={{animationDelay: '0.2s', opacity: 0}}
        >
          <div className="flex items-center justify-center text-accent mb-4"><Gift size={40} /></div>
          <h2 className="font-display text-3xl text-secondary mb-2">Days We've Shared</h2>
          <p className="text-6xl font-bold text-primary">{getDaysTogether()}</p>
          <p className="text-text-light mt-2">Since May 10, 2025</p>
        </motion.div>

        {/* Countdown to Our Next Hello */}
        <motion.div 
          className="bg-white/50 p-8 rounded-2xl shadow-lg shadow-rose-100 animate-slide-in-bottom flex flex-col justify-center items-center"
          style={{animationDelay: '0.4s', opacity: 0}}
        >
          <div className="flex items-center justify-center text-accent mb-4"><Clock size={40} /></div>
          <h2 className="font-display text-3xl text-secondary mb-2">Countdown to Our Next Hello</h2>
          
          {isLoading ? <p>Loading...</p> : (
            isEditing ? (
              // This is the editing view with the date input
              <div className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto">
                <input 
                  type="datetime-local" 
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full p-2 border rounded-md text-text-main"
                />
                <div className="flex gap-2">
                  <button onClick={handleSaveDate} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2"><Save size={18}/> Save</button>
                  <button onClick={() => setIsEditing(false)} className="bg-gray-200 text-text-main px-4 py-2 rounded-lg">Cancel</button>
                </div>
              </div>
            ) : (
              // This is the display view
              targetDate ? (
                <>
                  <CountdownTimer targetDate={targetDate} />
                  <button onClick={() => setIsEditing(true)} className="mt-4 text-secondary hover:text-primary transition"><Pencil size={18}/></button>
                </>
              ) : (
                <button onClick={() => setIsEditing(true)} className="bg-accent text-text-main font-bold py-2 px-4 rounded-lg">Set a Date</button>
              )
            )
          )}
        </motion.div>
      </div>

      <div>
        <h2 className="font-display text-4xl text-center text-secondary mb-6">Our Cherished Moments</h2>
        <MemoriesSlideshow />
      </div>
    </motion.div>
  );
};

export default HomePage;