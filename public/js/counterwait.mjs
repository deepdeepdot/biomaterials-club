const MAX_NUM_CYCLES = 1000; // Maybe it should be with some timeout period, not # of cycles?

let count = 0;
let cycles = 0;

function waitFor(condition, execution, waitCycleDuration = 500) {
    let interval = setInterval(() => {       
        if (condition(count)) {
            execution();
            clearInterval(interval);
        }
        cycles++;
        if (cycles === MAX_NUM_CYCLES) {
            clearInterval(interval);
        }
    }, waitCycleDuration);
}

function incrementCount() { // Atomic operation, avoid race conditions
    requestAnimationFrame(() => {
        count++;
    });
}

function resetCounter() {
    count = 0;
}

let CounterWait = {
    resetCounter,
    incrementCount,
    waitFor
};

export default CounterWait;
