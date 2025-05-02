// store.js
import { create } from 'zustand';

export const useStore = create((set) => ({
  signal: 0,
  fireSig: () => {
    console.log("hello bro");
    set((state) => ({ signal: state.signal + 1 })); // Correctly closed the set function
  }
}));
