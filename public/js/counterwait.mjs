// @ts-check
const DEFAULT_MAX_NUM_CYCLES = 1000;
const DEFAULT_WAIT_CYCLE_DURATION = 500;

function createCounterWait() {
  let count = 0;
  let cycles = 0;

  function waitFor(
    name,
    condition,
    waitCycleDuration = DEFAULT_WAIT_CYCLE_DURATION,
    maxNumCycles = DEFAULT_MAX_NUM_CYCLES,
  ) {
    return new Promise((resolve, reject) => {
      let interval = setInterval(() => {
        if (condition(count)) {
          clearInterval(interval);
          resolve({});
        }
        cycles += 1;
        if (cycles === maxNumCycles) {
          clearInterval(interval);
          reject(new Error(`${name}: Timeout. Condition never happened.`));
        }
      }, waitCycleDuration);
    });
  }

  function incrementCount() {
    // Atomic operation, queue up updates and avoid race conditions
    requestAnimationFrame(() => {
      count += 1;
    });
  }

  return {
    incrementCount,
    waitFor,
  };
}

export default createCounterWait;
