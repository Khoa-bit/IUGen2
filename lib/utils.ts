export function mergeMaps(...iterables: Map<any, any>[]) {
  const map = new Map();
  for (const iterable of iterables) {
    for (const item of iterable) {
      map.set(...item);
    }
  }
  return map;
}
