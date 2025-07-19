import { create } from "zustand";   
import { persist } from "zustand/middleware";

export const useHabitStore = create(persist(
    (set) => ({
        habits : null,
        setHabits : (habitsData) => set({ habits : habitsData }),
        clearHabits : () => set({ habits : null })
    }),
    {
        name : 'habit-storage',
    }
))