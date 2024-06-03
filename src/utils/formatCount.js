export function FormatCount(count) {
    if (count < 1000) {
      return count.toString();
    }
    const countInK = (count / 1000).toFixed(1); // Keeps one decimal place
    return countInK.endsWith('.0') ? countInK.slice(0, -2) + 'k' : countInK + 'k';
  }
  
  