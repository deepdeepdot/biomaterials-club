const MAX_NUM_CYCLES = 1000; // Maybe it should be with some timeout period, not # of cycles?

function createCounterWait() {
  let count = 0;
  let cycles = 0;

  // Acting as singleton, this could be dangerous when called multiple times?

  function waitFor(condition, waitCycleDuration = 500) {
    count = 0; // Reset every time we call it
    return new Promise((resolve, reject) => {
      let interval = setInterval(() => {
        if (condition(count)) {
          clearInterval(interval);
          resolve();
        }
        cycles++;
        if (cycles === MAX_NUM_CYCLES) {
          clearInterval(interval);
          reject('Condition never happened. Timeout');
        }
      }, waitCycleDuration);
    });
  }

  function incrementCount() {
    // Atomic operation, avoid race conditions
    requestAnimationFrame(() => {
      count++;
    });
  }

  return {
    incrementCount,
    waitFor,
  };
}

export default createCounterWait;
