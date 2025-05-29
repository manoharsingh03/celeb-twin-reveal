
import { useState, useEffect } from 'react';
import { celebrities, Celebrity } from '@/data/celebrities';
import { initializeFaceApi, getFaceEmbedding, calculateSimilarity, loadImageFromUrl } from '@/utils/faceApi';

interface MatchResult {
  celebrity: Celebrity;
  matchScore: number;
}

export const useFaceMatching = () => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [celebrityEmbeddings, setCelebrityEmbeddings] = useState<Map<string, number[]>>(new Map());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializeSystem();
  }, []);

  const initializeSystem = async () => {
    if (isReady) return;
    
    setIsInitializing(true);
    setError(null);

    try {
      // Initialize face-api.js
      await initializeFaceApi();

      // Precompute celebrity embeddings
      await computeCelebrityEmbeddings();

      setIsReady(true);
      console.log('Face matching system ready!');
    } catch (err) {
      console.error('Failed to initialize face matching:', err);
      setError('Failed to initialize face recognition system');
    } finally {
      setIsInitializing(false);
    }
  };

  const computeCelebrityEmbeddings = async () => {
    const embeddings = new Map<string, number[]>();

    for (const celebrity of celebrities) {
      try {
        const img = await loadImageFromUrl(celebrity.imageUrl);
        const embedding = await getFaceEmbedding(img);
        
        if (embedding) {
          embeddings.set(celebrity.name, embedding);
          console.log(`Computed embedding for ${celebrity.name}`);
        } else {
          console.warn(`Could not detect face for ${celebrity.name}`);
        }
      } catch (error) {
        console.warn(`Failed to process ${celebrity.name}:`, error);
      }
    }

    setCelebrityEmbeddings(embeddings);
    console.log(`Computed embeddings for ${embeddings.size} celebrities`);
  };

  const findCelebrityMatch = async (userImageUrl: string): Promise<MatchResult | null> => {
    if (!isReady || celebrityEmbeddings.size === 0) {
      throw new Error('Face matching system not ready');
    }

    try {
      // Load user image and get embedding
      const userImg = await loadImageFromUrl(userImageUrl);
      const userEmbedding = await getFaceEmbedding(userImg);

      if (!userEmbedding) {
        throw new Error('Could not detect face in uploaded image');
      }

      // Find best match
      let bestMatch: MatchResult | null = null;
      let highestScore = 0;

      for (const [celebName, celebEmbedding] of celebrityEmbeddings) {
        const similarity = calculateSimilarity(userEmbedding, celebEmbedding);
        
        if (similarity > highestScore) {
          highestScore = similarity;
          const celebrity = celebrities.find(c => c.name === celebName);
          if (celebrity) {
            bestMatch = {
              celebrity,
              matchScore: Math.round(similarity)
            };
          }
        }
      }

      // Ensure minimum score for better UX
      if (bestMatch && bestMatch.matchScore < 60) {
        bestMatch.matchScore = Math.max(60, bestMatch.matchScore + Math.random() * 15);
      }

      return bestMatch;
    } catch (error) {
      console.error('Error finding celebrity match:', error);
      throw error;
    }
  };

  return {
    isInitializing,
    isReady,
    error,
    findCelebrityMatch,
    initializeSystem
  };
};
