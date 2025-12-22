export const createMetrics = () => {
  const counts = {};

  return {
    inc(actionName) {
      if (!counts[actionName]) {
        counts[actionName] = 0;
      }
      counts[actionName]++;
    },

    snapshot() {
      return { ...counts };
    },
  };
};
