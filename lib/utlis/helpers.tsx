export function searchObjects<T extends Record<string, any>>(
  array: T[],
  searchKey: keyof T,
  searchTerm: string,
  rangeKey?: keyof T,
  min?: number,
  max?: number
): T[] {
  if (!Array.isArray(array)) throw new Error("First argument must be an array");
  if (typeof searchKey !== 'string') throw new Error("Search key must be a string");
  if (rangeKey && typeof rangeKey !== 'string') throw new Error("Range key must be a string");

  return array.filter(item => {
    const value = item[searchKey];
    const rangeValue = rangeKey ? item[rangeKey] : undefined;

    const matchesSearch =
      !searchTerm.trim() ||
      (typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRange =
      rangeKey == null ||
      (typeof rangeValue === 'number' &&
        (min == null || rangeValue >= min) &&
        (max == null || rangeValue <= max));

    return matchesSearch && matchesRange;
  });
}