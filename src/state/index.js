import create from "zustand";
import { db } from "initialization/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export const useStore = create((set, get) => ({
  firestore: {
    user: {},
    goals: null,
  },
  fetchUser: async (email) => {
    if (!get().firestore.user?.id) {
      const queries = query(
        collection(db, "users"),
        where("email", "==", email)
      );
      const { docs } = await getDocs(queries);
      const currentUser = { id: docs[0].id, ...docs[0]?.data() };

      // Create user profile the first time they log-in
      if (!currentUser?.id) {
        addDoc(collection(db, "users"), {
          email: email,
          createdAt: serverTimestamp(),
        });
      }
      set({ firestore: { user: { id: docs[0]?.id, ...currentUser } } });
    }
  },
  fetchAllGoals: async () => {
    const userId = get().firestore.user?.id;
    const goals = get().firestore.goals;

    if (userId && !goals) {
      const queries = query(
        collection(db, "goals"),
        where("parentId", "==", userId)
      );
      const { docs } = await getDocs(queries);
      const savingGoals = docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      set({ firestore: { ...get().firestore, goals: [...savingGoals] } });
    } else {
      set({ firestore: { ...get().firestore, goals: [] } });
    }
  },
}));
