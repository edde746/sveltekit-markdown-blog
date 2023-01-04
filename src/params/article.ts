export const match = (s: string): boolean => {
  const parts = s.split('/');
  return isNaN(Number(parts[0])) && isNaN(Number(parts[1])) && parts.length === 2;
};
