export function formatProjectName(name: string): string {
  if (name !== name.toLowerCase()) return name;

  return name.replace(/\b[a-z]/g, (char) => char.toUpperCase());
}
