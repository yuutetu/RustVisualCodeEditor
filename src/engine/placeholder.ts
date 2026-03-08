const PLACEHOLDER_RE = /\{\{(\w+)\}\}/g;

export function findPlaceholders(
  code: string,
): Array<{ name: string; start: number; end: number }> {
  const results: Array<{ name: string; start: number; end: number }> = [];
  let match: RegExpExecArray | null;
  const re = new RegExp(PLACEHOLDER_RE.source, 'g');
  while ((match = re.exec(code)) !== null) {
    results.push({ name: match[1], start: match.index, end: re.lastIndex });
  }
  return results;
}

export function replacePlaceholder(
  code: string,
  name: string,
  newValue: string,
): string {
  return code.split(`{{${name}}}`).join(newValue);
}
