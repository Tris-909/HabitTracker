import create from "zustand";
import { db } from "initialization/firebase";
import {
  doc,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export const useStore = create((set, get) => ({
  user: {},
  // USER
  fetchUser: async (email) => {
    if (!get().user?.id) {
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

      set({
        user: { id: docs[0]?.id, ...currentUser },
      });
    }
  },
}));

export const useGoalStore = create((set, get) => ({
  goals: [],
  fetchAllGoals: async ({ userId }) => {
    if (userId) {
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

      set({ goals: savingGoals });
    }
  },
}));

export const useStepStore = create((set, get) => ({
  steps: [],
  createStep: async ({ user, amount, description, goalId }) => {
    const { id, email } = user;
    const step = {
      amount: amount,
      description: description,
      parentId: goalId,
      userId: id,
      createdBy: email,
      createdAt: serverTimestamp(),
    };
    const result = await addDoc(collection(db, "steps"), step);

    set({
      steps: [...get().steps, { id: result.id, ...step }],
    });
  },
  fetchStepsByGoalId: async ({ goalId }) => {
    const queries = query(
      collection(db, "steps"),
      where("parentId", "==", goalId)
    );
    const { docs } = await getDocs(queries);
    const steps = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    set({ steps: steps });
  },
  updateStepId: async ({ stepId, amount, description }) => {
    const newStepsArr = get().steps.map((step) => {
      if (step.id === stepId) {
        return {
          ...step,
          amount: amount,
          description: description,
        };
      }
    });
    set({
      steps: newStepsArr,
    });

    await updateDoc(doc(db, "steps", stepId), {
      amount: amount,
      description: description,
    });
  },
  deleteStepById: async ({ stepId }) => {
    const newStepsArr = get().steps.filter((step) => step.id !== stepId);
    set({
      steps: newStepsArr,
    });

    await deleteDoc(doc(db, "steps", stepId));
  },
}));
