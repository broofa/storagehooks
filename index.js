import { useEffect, useState } from 'react';

const TEST_KEY = '__okay';

/**
 * Verify that storage is operational
 */
function checkStorage(storage) {
  try {
    sessionStorage.setItem(TEST_KEY, 'hello');
    sessionStorage.removeItem(TEST_KEY);
    return true;
  } catch (err) {
    // Intentionally blank
  }

  return false;
}

/**
 * Parse a JSON value w/out throwing an error.  Returns is null for invalid JSON
 * strings.
 */

/**
 * React hook for getting/setting state in storage object.  Monitors
 * window.storage events for extrenal changes.
 */
function useStorage(storage, key, initialState) {
  function parseStorageValue(json) {
    try {
      return JSON.parse(json);
    } catch (err) {
      console.error(new Error(`"${key}" set to non-JSON value (${json})`));
      return null;
    }
  }
  
  const storageValue = parseStorageValue(storage.getItem(key));
  const [value, setValue] = useState(storageValue ?? initialState);
  
  function handleStorage({key: k, storageArea, newValue : json}) {
    if (k === key && storageArea === storage) {
      setValue(parseStorageValue(json));
    }
  }
  
  function _setValue(v) {
    if (v == null) {
      storage.removeItem(key);
    } else {
      let newValue = v ?? initialState;
      newValue = JSON.stringify(v);
      storage.setItem(key, newValue);
      
      // Propagate in this window since storage events aren't .
      const e = new StorageEvent('storage');
      e.initStorageEvent(
        'storage', 
        false,
        false,
        key,
        value == null ? null : JSON.stringify(value),
        newValue,
        String(location),
        storage
      );

      window.dispatchEvent(e);
    }
  }
  
  useEffect(() => {
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);
  
  return [value, _setValue];
}

export const useSessionStorage = useStorage.bind(null, window.sessionStorage);
export const useLocalStorage = useStorage.bind(null, window.localStorage);
