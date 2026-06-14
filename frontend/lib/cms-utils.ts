// Generates a sequence [1..n] to avoid hardcoding arrays for repeated UI elements (e.g. weeks, slots)
export function range(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i + 1);
}
