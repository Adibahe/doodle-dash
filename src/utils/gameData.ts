
export interface DrawingPrompt {
  word: string;
  category: string;
}

export const drawingPrompts: DrawingPrompt[] = [
  { word: 'apple', category: 'food' },
  { word: 'banana', category: 'food' },
  { word: 'car', category: 'vehicle' },
  { word: 'house', category: 'building' },
  { word: 'tree', category: 'nature' },
  { word: 'cat', category: 'animal' },
  { word: 'dog', category: 'animal' },
  { word: 'fish', category: 'animal' },
  { word: 'flower', category: 'nature' },
  { word: 'sun', category: 'nature' },
  { word: 'moon', category: 'nature' },
  { word: 'star', category: 'nature' },
  { word: 'airplane', category: 'vehicle' },
  { word: 'chair', category: 'furniture' },
  { word: 'table', category: 'furniture' },
  { word: 'book', category: 'object' },
  { word: 'pencil', category: 'object' },
  { word: 'clock', category: 'object' },
  { word: 'umbrella', category: 'object' },
  { word: 'hat', category: 'clothing' },
  { word: 'shoe', category: 'clothing' },
  { word: 'glasses', category: 'clothing' },
  { word: 'bicycle', category: 'vehicle' },
  { word: 'pizza', category: 'food' },
  { word: 'bird', category: 'animal' },
];

// Function to get a random prompt
export const getRandomPrompt = (): DrawingPrompt => {
  const randomIndex = Math.floor(Math.random() * drawingPrompts.length);
  return drawingPrompts[randomIndex];
};

// Mock function to simulate AI recognition
// In a real app, this would be replaced with a proper ML model
export const recognizeDrawing = (imageData: string, prompt: string): boolean => {
  // For demo purposes, we'll just randomly return true or false with a bias toward true
  const randomChance = Math.random();
  return randomChance > 0.3;
};
