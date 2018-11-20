import { actualGet, actualSet, actualClear } from './utils';
import { IPreserve, ListenerType } from './Interfaces';

export default function preserve(
  key: string,
  initialData: any = []
): IPreserve {
  if (!key) {
    throw new Error(`'Preserve' needs a key to keep track of you data.`);
  }

  let currentData = initialData;
  let prevData = currentData;
  const listeners: ListenerType[] = [];

  if (currentData) {
    set(currentData);
  }

  /**
   * Provides you with the current localStorage
   * data JSON-parsed.
   */
  function get() {
    return actualGet(key);
  }

  /**
   * Use this function to override current localStorage data
   * with new updated data.
   */
  function set(data: any) {
    if (!data) throw new Error(`Please provide data to the 'set' method.`);

    prevData = currentData;
    currentData = data;
    listeners.forEach(l => l(prevData, currentData));
    return actualSet(key, currentData);
  }

  /**
   * Use this method to listen for changes in your localStorage item.
   * @param listener - A callback function that provides prevData and nextData as params.
   * @returns - an ubsubscribe function to make rid of unused subscriptions.
   */
  function subscribe(listener: ListenerType) {
    listeners.push(listener);
    let isSubscribed = true;

    return () => {
      if (!isSubscribed) return;

      isSubscribed = false;

      listeners.filter(l => l !== listener);
    };
  }

  function clearItem(key: string) {
    if (!key) {
      throw new Error(`Cannot clear localStorage item without the key.`);
    }

    return actualClear(key);
  }

  return {
    get,
    set,
    subscribe,
    clearItem
  };
}