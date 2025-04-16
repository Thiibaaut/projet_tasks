import { create } from "zustand";
import { persist } from "zustand/middleware"

const useTalks = create(
  persist(
  (set) => ({
  talks: [],

  addTalk: (talk) =>
    set((state) => ({ talks: [...state.talks, talk] })),

  removeTalk: (id) =>
    set((state) => ({
      talks: state.talks.filter((talk) => talk.id !== id),
    })),

  clearTalks: () => set({ talks: [] }),

  updateTalk: (updatedTalk) =>
    set((state) => ({
      talks: state.talks.map((talk) =>
        talk.id === updatedTalk.id ? { ...talk, ...updatedTalk } : talk
      ),
    })),

  doneTalk: (id) =>
      set((state) => ({
        talks: state.talks.map((talk) =>
          talk.id === id ? { ...talk, done: !talk.done } : talk
        ),
    })),
}),
  {
    name: "talks-storage",
  }
)
);

export default useTalks;
