export function createMetrics() {
     let counts = {};
     return {
          inc(action) {
               counts[action] = (counts[action] || 0) + 1;
          },
          snapshot() {
               return { ...counts };
          },
     };
}
const m = createMetrics();
m.inc("add");
m.inc("add");
console.log("Metrics Test :", m.snapshot());
