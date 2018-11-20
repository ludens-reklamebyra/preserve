function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function actualSet(key: string, data: any) {
  if (isBrowser()) {
    return window.localStorage.setItem(key, JSON.stringify(data));
  }
  return;
}

function actualGet(key: string) {
  if (isBrowser()) {
    return JSON.parse(window.localStorage.getItem(key));
  }

  return;
}

function actualClear(key: string) {
  if (isBrowser()) {
    return window.localStorage.removeItem(key);
  }
}

export { actualSet, actualGet, actualClear };
