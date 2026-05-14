import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Feedback } from "@/types";

interface UserState {
  userId: string;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  logout: () => void;
  switchUser: (userId: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: "",
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      logout: () =>
        set({
          userId: "",
        }),
      switchUser: (userId) => {
        set({ userId });
        localStorage.setItem("userId", userId);
      },
    }),
    {
      name: "user-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

interface FeedbackWithUser extends Feedback {
  userId: string;
}

interface FeedbackState {
  feedbackList: FeedbackWithUser[];
  addFeedback: (feedback: Omit<Feedback, "id" | "createdAt">, userId: string) => void;
  removeFeedback: (id: string) => void;
  clearFeedback: (userId: string) => void;
  getUserFeedback: (userId: string) => FeedbackWithUser[];
}

export const useFeedbackStore = create<FeedbackState>()(
  persist(
    (set, get) => ({
      feedbackList: [],
      addFeedback: (feedback, userId) =>
        set((state) => ({
          feedbackList: [
            ...state.feedbackList,
            {
              ...feedback,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
              userId,
            },
          ],
        })),
      removeFeedback: (id) =>
        set((state) => ({
          feedbackList: state.feedbackList.filter((f) => f.id !== id),
        })),
      clearFeedback: (userId) =>
        set((state) => ({
          feedbackList: state.feedbackList.filter((f) => f.userId !== userId),
        })),
      getUserFeedback: (userId) => {
        return get().feedbackList.filter((f) => f.userId === userId);
      },
    }),
    {
      name: "feedback-storage",
    }
  )
);
