import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useCheckinStore = create(persist(
    (set) => ({
        checkins : [],
        setCheckins : (checkinsData) => set({ checkins : checkinsData }),
        clearCheckins : () => set({ checkins : null })
    }),
    {
        name : 'checkin-storage'
    }
))