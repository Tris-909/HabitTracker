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
import dayjs from "dayjs";

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
  createGoal: async ({ user, title, amount, description }) => {
    const { id, email } = user;
    const goal = {
      title: title,
      goal: amount,
      current: 0,
      description: description,
      parentId: id,
      userId: id,
      createdBy: email,
      createdAt: serverTimestamp(),
    };
    const result = await addDoc(collection(db, "goals"), goal);

    set({
      goals: [...get().goals, { id: result.id, ...goal }],
    });

    notify({
      notifyMessage: "Created a step succesfully.",
      notifyRule: notifyRules.SUCCESS,
    });
  },
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
      goals: [],
    });
  },
}));

export const useStepStore = create((set, get) => ({
  steps: {},
  goalInfo: {},
  updateGoalInfo: ({ stepObj, goal }) => {
    const goalId = goal.id;
    const goalInfoObj = {
      ...get().goalInfo,
    };
    const newTotalAmount = stepObj[goalId].reduce((total, step) => {
      return total + Number(step.amount);
    }, 0);
    const newLossAmount = stepObj[goalId].reduce((total, step) => {
      if (Math.sign(step.amount * 1) === -1) {
        return total + step.amount * 1;
      } else {
        return total + 0;
      }
    }, 0);
    const newTotalSteps = stepObj[goalId].length;
    goalInfoObj[goalId] = {
      ...get().goalInfo[goalId],
      total: newTotalAmount,
      loss: newLossAmount,
      steps: newTotalSteps,
      progress:
        newTotalAmount !== 0
          ? Math.round((newTotalAmount / goal?.goal) * 100 * 10) / 10
          : 0,
    };

    set({
      goalInfo: goalInfoObj,
    });
  },
  createStep: async ({ user, amount, description, goal }) => {
    try {
      const goalId = goal.id;
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

      // Try to get the current date for createdAt locally first since can't find a way to retrieve serverTimestamp without a request
      step.createdAt.seconds = dayjs(dayjs()).unix();

      const stepObj = {
        ...get().steps,
      };
      stepObj[goalId] = [{ id: result.id, ...step }, ...get().steps[goalId]];
      get().updateGoalInfo({
        stepObj: stepObj,
        goal: goal,
      });

      set({
        steps: stepObj,
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
  fetchStepsByGoalId: async ({ goal }) => {
    try {
      const goalId = goal.id;
      const currentStepObj = get().steps;

      if (goalId in currentStepObj === false) {
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

        const stepObj = {
          ...get().steps,
        };
        stepObj[goalId] = steps;
        get().updateGoalInfo({
          stepObj: stepObj,
          goal: goal,
        });

        set({
          steps: stepObj,
        });
      } else {
        console.error("Already fetched current goalId", goalId);
      }
    } catch (error) {
      console.error("ERROR", error.message);
      notify({
        notifyMessage:
          "Failed to fetch all steps for this goal, please try again.",
        notifyRule: notifyRules.ERROR,
      });
    }
  },
  updateStepId: async ({ stepId, goalId, amount, description }) => {
    try {
      const newStepsArr = get().steps[goalId].map((step) => {
        if (step.id === stepId) {
          return {
            ...step,
            amount: amount,
            description: description,
          };
        }
        return step;
      });

      const stepObj = {
        ...get().steps,
      };
      stepObj[goalId] = newStepsArr;
      get().updateGoalInfo({
        stepObj: stepObj,
        goalId: goalId,
      });

      set({
        steps: stepObj,
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
  deleteStepById: async ({ stepId, goalId }) => {
    try {
      const newStepsArr = get().steps[goalId].filter(
        (step) => step.id !== stepId
      );

      const stepObj = {
        ...get().steps,
      };
      stepObj[goalId] = newStepsArr;
      get().updateGoalInfo({
        stepObj: stepObj,
        goalId: goalId,
      });

      set({
        steps: stepObj,
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
      steps: {},
      goalInfo: {},
    });
  },
}));
