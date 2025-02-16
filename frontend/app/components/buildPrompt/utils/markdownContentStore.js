import { create } from 'zustand';

// Create a store using Zustand
const useStore = create((set) => ({
  // Initial state
  markdownContent: "# Hello World", // Initial markdown content
  diffMarkdownContent: "Older version",
  contentAddedByDnD: false, // Flag to indicate if content was added by drag and drop
  
  // Setter functions
  setMarkdownContent: (value, isDnD = false) => set({ markdownContent: value, contentAddedByDnD: isDnD }),
  setDiffMarkdownContent: (value) => set({diffMarkdownContent: value}),
  // Function to set markdown content and update the DnD flag
  setDnD: (isDnD) => set({ contentAddedByDnD: isDnD }),
}));

export default useStore;