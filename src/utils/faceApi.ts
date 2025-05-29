
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

  // Convert distance to similarity percentage (lower distance = higher similarity)
  const maxDistance = 1.0; // Typical max distance for face embeddings
  const similarity = Math.max(0, (1 - distance / maxDistance) * 100);
  
  return Math.min(100, similarity);
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
