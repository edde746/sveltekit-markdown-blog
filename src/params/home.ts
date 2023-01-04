export const match = (s: string): boolean => {
  if (s === '') {
    return true;
  }

  if (!isNaN(Number(s))) {
    return true;
  }

  if (s.match(/^[a-zA-Z]+\/\d+$/)) {
    return true;
  }

  return !s.includes('/');
};
