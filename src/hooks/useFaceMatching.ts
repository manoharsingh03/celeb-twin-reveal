
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
      console.log('Initializing face-api.js...');
      await initializeFaceApi();

      console.log('Computing celebrity embeddings...');
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
        console.log(`Processing ${celebrity.name}...`);
        const img = await loadImageFromUrl(celebrity.imageUrl);
        const embedding = await getFaceEmbedding(img);
        
        if (embedding) {
          embeddings.set(celebrity.name, embedding);
          console.log(`✓ Computed embedding for ${celebrity.name} (${embedding.length} features)`);
        } else {
          console.warn(`⚠ Could not detect face for ${celebrity.name}`);
        }
      } catch (error) {
        console.warn(`✗ Failed to process ${celebrity.name}:`, error);
      }
    }

    setCelebrityEmbeddings(embeddings);
    console.log(`🎯 Successfully computed embeddings for ${embeddings.size}/${celebrities.length} celebrities`);
  };

  const findCelebrityMatch = async (userImageUrl: string): Promise<MatchResult | null> => {
    if (!isReady || celebrityEmbeddings.size === 0) {
      throw new Error('Face matching system not ready');
    }

    try {
      console.log('Loading user image...');
      const userImg = await loadImageFromUrl(userImageUrl);
      
      console.log('Extracting face features...');
      const userEmbedding = await getFaceEmbedding(userImg);

      if (!userEmbedding) {
        throw new Error('Could not detect face in uploaded image. Please try a clearer photo with your face clearly visible.');
      }

      console.log(`✓ User face embedding extracted (${userEmbedding.length} features)`);

      // Find best match using real similarity calculations
      let bestMatch: MatchResult | null = null;
      let highestScore = 0;

      console.log('Comparing with celebrities...');
      for (const [celebName, celebEmbedding] of celebrityEmbeddings) {
        const similarity = calculateSimilarity(userEmbedding, celebEmbedding);
        console.log(`${celebName}: ${similarity}% similarity`);
        
        if (similarity > highestScore) {
          highestScore = similarity;
          const celebrity = celebrities.find(c => c.name === celebName);
          if (celebrity) {
            bestMatch = {
              celebrity,
              matchScore: similarity
            };
          }
        }
      }

      if (bestMatch) {
        console.log(`🎯 Best match: ${bestMatch.celebrity.name} with ${bestMatch.matchScore}% similarity`);
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
