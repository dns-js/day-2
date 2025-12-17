export function createMetrics() {
  const counters = {};
  
  return {
    inc(actionName) {
      if (!counters[actionName]) {
        counters[actionName] = 0;
      }
      counters[actionName]++;
    },
    
    snapshot() {
      return { ...counters };
    }
  };
}