export function createMetrics() {
    const counters = {};

    function inc(actionName) {
        if(typeof actionName !== 'string' || actionName.trim() === '') {
            return;
        }
        counters[actionName] = (counters[actionName] ?? 0) + 1;
    }

    function snapshot() {
        return {...counters};
    }

    return {
        inc,
        snapshot
    };
}