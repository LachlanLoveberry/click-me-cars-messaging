export function getTotal(str: string): number | null {
  if (!str) return null;
  const withoutCommas = str.replace(/[,]/g, "");
  const negativeConverted =
    withoutCommas.startsWith("(") && withoutCommas.endsWith(")")
      ? -parseFloat(withoutCommas.slice(1, -1))
      : parseFloat(withoutCommas);
  return negativeConverted;
}
