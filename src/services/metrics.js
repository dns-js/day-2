export function createMetrics() {
    // state private(tidak global)
    const counters = {};

    function inc(actionName) {
        if (!actionName) return;

        counters[actionName] = (counters[actionName] || 0) + 1;
    }
    function snapshot() {
        //return salinan agar tidak bisa dimodifikasi dari luar
        return { ...counters };
    }

    return {
        inc,
        snapshot,
    };
}