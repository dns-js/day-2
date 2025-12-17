
export const createMetrics = () => {
  // Private variable captured by closure
  const counters = {};

  const inc = (actionName) => {
    if (!counters[actionName]) {
      counters[actionName] = 0;
    }
    counters[actionName] += 1;
  };

  const snapshot = () => {
    // Return a copy to prevent mutation of internal state
    return { ...counters };
  };

  return {
    inc,
    snapshot
  };
};
