export function createMetrics() {
  const counters = {};

  return {
    inc(action) {
      counters[action] = (counters[action] || 0) + 1;
    },
    snapshot() {
      return { ...counters };
    },
  };
}
