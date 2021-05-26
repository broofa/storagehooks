import { useEffect, useState } from 'react';

/**
 * React hook for getting/setting state in storage object.  Monitors
 * window.storage events for extrenal changes.
 */
function useStorage (storage, key, initialState, options = {}) {
  /**
   * Parse a JSON value w/out throwing an error.  Returns is null for invalid JSON
   * strings.
   */
  function parseStorageValue (json) {
    try {
      return JSON.parse(json);
    } catch (err) {
      console.error(new Error(`"${key}" has non-JSON value (${json}). Using null instead.`));
      return null;
    }
  }

  const storageValue = parseStorageValue(storage.getItem(key));
  const [value, setValue] = useState(storageValue ?? initialState);

  function handleStorage ({ key: k, storageArea, newValue: json }) {
    if (k === key && storageArea === storage) {
      setValue(parseStorageValue(json));
    }
  }

  function _setValue (v) {
    const oldValue = storage.getItem(key);
    const newValue = v == null ? null : JSON.stringify(v);

    if (v == null) {
      storage.removeItem(key);
    } else {
      storage.setItem(key, newValue);
    }

    // If we're not both listening and dispatching, we need to set the value directly
    if (!options.listen || !options.dispatch) {
      setValue(v);
      return;
    }

    if (options.dispatch ?? true) {
      // ... otherwise we can dispatch the event and let the listener our listener
      // update the value for us (allowing for a consistent control flow regardless
      // of where the value change originates from)
      const e = new window.StorageEvent('storage');
      e.initStorageEvent(
        'storage',
        false,
        false,
        key,
        oldValue,
        newValue,
        String(window.location),
        storage
      );

      window.dispatchEvent(e);
    }
  }

  useEffect(() => {
    if (!(options.listen ?? true)) return;
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [options.listen, options.dispatch]);

  return [value, _setValue];
}

export const useSessionStorage = useStorage.bind(null, window.sessionStorage);
export const useLocalStorage = useStorage.bind(null, window.localStorage);
