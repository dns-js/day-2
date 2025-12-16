export const createMetrics = () => {
  const counters = {};

  return {
    inc: (actionName) => {
      counters[actionName] = (counters[actionName] || 0) + 1;
    },
    snapshot: () => {
      return { ...counters };
    },
  };
};
