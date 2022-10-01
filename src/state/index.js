import create from "zustand";
import { db } from "initialization/firebase";
import {
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  serverTimestamp,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { notify, notifyRules } from "components";

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

      // Create user in cloudstore the first time they log-in
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
  clearUserStore: () => {
    set({
      user: {},
    });
  },
}));

export const useGoalStore = create((set, get) => ({
  goals: [],
  fetchAllGoals: async ({ userId }) => {
    try {
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
    } catch (error) {
      console.error("ERROR", error.message);
      notify({
        notifyMessage: "Failed to load goals, please refresh the page",
        notifyRule: notifyRules.ERROR,
      });
    }
  },
  clearGoalsStore: () => {
    set({
      goals: {},
    });
  },
}));

export const useStepStore = create((set, get) => ({
  steps: [],
  createStep: async ({ user, amount, description, goalId }) => {
    try {
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

      notify({
        notifyMessage: "Created a step succesfully.",
        notifyRule: notifyRules.SUCCESS,
      });
    } catch (error) {
      console.error("ERROR", error.message);
      notify({
        notifyMessage: "Failed to create a step, please try again.",
        notifyRule: notifyRules.ERROR,
      });
    }
  },
  fetchStepsByGoalId: async ({ goalId }) => {
    try {
      const queries = query(
        collection(db, "steps"),
        where("parentId", "==", goalId),
        orderBy("createdAt", "desc")
      );
      const { docs } = await getDocs(queries);
      const steps = docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      set({ steps: steps });
    } catch (error) {
      console.error("ERROR", error.message);
      notify({
        notifyMessage:
          "Failed to fetch all steps for this goal, please try again.",
        notifyRule: notifyRules.ERROR,
      });
    }
  },
  updateStepId: async ({ stepId, amount, description }) => {
    try {
      const newStepsArr = get().steps.map((step) => {
        if (step.id === stepId) {
          return {
            ...step,
            amount: amount,
            description: description,
          };
        }
        return step;
      });
      set({
        steps: newStepsArr,
      });

      await updateDoc(doc(db, "steps", stepId), {
        amount: amount,
        description: description,
      });

      notify({
        notifyMessage: "Update a step succesfully.",
        notifyRule: notifyRules.SUCCESS,
      });
    } catch (error) {
      console.error("ERROR", error.message);
      notify({
        notifyMessage: "Failed to update a step, please try again.",
        notifyRule: notifyRules.ERROR,
      });
    }
  },
  deleteStepById: async ({ stepId }) => {
    try {
      const newStepsArr = get().steps.filter((step) => step.id !== stepId);
      set({
        steps: newStepsArr,
      });

      await deleteDoc(doc(db, "steps", stepId));
      notify({
        notifyMessage: "Delete a step sucessfully",
        notifyRule: notifyRules.SUCCESS,
      });
    } catch (error) {
      console.error("ERROR", error.message);
      notify({
        notifyMessage: "Failed to update a step, please try again.",
        notifyRule: notifyRules.ERROR,
      });
    }
  },
  clearStepsStore: () => {
    set({
      goals: {},
    });
  },
}));
