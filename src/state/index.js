import create from "zustand";
import { db } from "initialization/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const useStore = create((set) => ({
  firestore: {
    user: {},
  },
  fetchUser: async (email) => {
    const queries = query(collection(db, "users"), where("email", "==", email));
    const { docs } = await getDocs(queries);
    const currentUser = docs[0]?.data();
    set({ firestore: { user: { id: docs[0].id, ...currentUser } } });
  },
}));
