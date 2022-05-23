export function normalize(original: string) {
  return original
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export const includeInsensitive = (first: string, second: string): boolean => {
  const _first = normalize(first);
  const _second = normalize(second);
  return _second !== '' && _first.includes(_second);
};

export const compareInsensitive = (first: string, second: string): number => {
  const _first = normalize(first);
  const _second = normalize(second);
  return _first < _second ? -1 : _first > _second ? 1 : 0;
};
