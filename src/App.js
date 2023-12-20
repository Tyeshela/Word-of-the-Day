import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const App = () => {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchWordOfTheDay = async () => {
    setLoading(true);
    try {
      // This URL would ideally point to an endpoint that gives a random word each day
      const response = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/example');
      if (!response.ok) {
        throw new Error('Failed to fetch word');
      }
      const data = await response.json();
      setWord(data[0].word);
      setDefinition(data[0].meanings[0].definitions[0].definition);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWordOfTheDay();
  }, []);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto text-center p-8 bg-white rounded-xl shadow-lg border border-gray-200"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Word of the Day
        </h1>
        {loading ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg text-gray-600"
          >
            Loading...
          </motion.p>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <p className="text-xl font-semibold text-indigo-600">{word}</p>
            <p className="text-gray-600">{definition}</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default App;
