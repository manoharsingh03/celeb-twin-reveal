
import * as faceapi from 'face-api.js';

let isInitialized = false;

export const initializeFaceApi = async (): Promise<void> => {
  if (isInitialized) return;

  try {
    // Load models from CDN for better performance
    const MODEL_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';
    
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    ]);

    console.log('Face-api.js models loaded successfully');
    isInitialized = true;
  } catch (error) {
    console.error('Error loading face-api.js models:', error);
    throw new Error('Failed to load face recognition models');
  }
};

export const getFaceEmbedding = async (imageElement: HTMLImageElement): Promise<number[] | null> => {
  try {
    const detection = await faceapi
      .detectSingleFace(imageElement, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      return null;
    }

    return Array.from(detection.descriptor);
  } catch (error) {
    console.error('Error extracting face embedding:', error);
    return null;
  }
};

export const calculateSimilarity = (embedding1: number[], embedding2: number[]): number => {
  if (embedding1.length !== embedding2.length) {
    return 0;
  }

  // Calculate Euclidean distance
  const distance = Math.sqrt(
    embedding1.reduce((sum, val, i) => sum + Math.pow(val - embedding2[i], 2), 0)
  );

  // Convert distance to similarity percentage with improved algorithm
  // Face-api.js typically produces distances between 0.2-1.2 for different people
  // and 0.0-0.6 for similar faces
  const normalizedDistance = Math.min(distance, 1.2); // Cap at typical max
  const similarity = Math.max(0, (1.2 - normalizedDistance) / 1.2 * 100);
  
  // Apply a more realistic curve - most people won't be 90%+ similar to celebrities
  const adjustedSimilarity = Math.pow(similarity / 100, 1.5) * 100;
  
  return Math.round(Math.max(50, Math.min(95, adjustedSimilarity))); // Keep between 50-95%
};

export const loadImageFromUrl = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
};
