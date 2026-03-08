const STORAGE_KEY = 'rust_editor_code';

export function saveCode(code: string): void {
  localStorage.setItem(STORAGE_KEY, code);
}

export function loadCode(): string | null {
  return localStorage.getItem(STORAGE_KEY);
}
