import { LSKey } from '@helpers/localStorageConnector/localStorageKeys.enum';

export const isStorageItemExist = (key: LSKey): boolean => {
  return key in localStorage;
};

export const setStorageItem = <T>(
  key: LSKey,
  state: T,
): T | undefined => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);

    return state;
  } catch (_error) {
    return undefined;
  }
};

export const getStorageItem = <T>(key: LSKey): T | undefined => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) return undefined;

    return JSON.parse(serializedState) as T;
  } catch (_error) {
    return undefined;
  }
};

export const replaceStorageItemField = <T>(
  key: LSKey,
  partialState: Partial<T>,
): T | undefined => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) return undefined;
    const parsedState = JSON.parse(serializedState) as T;
    const newState = {
      ...parsedState,
      ...partialState,
    };
    setStorageItem(key, newState);

    return newState;
  } catch (_error) {
    return undefined;
  }
};

export const removeStorageItem = (key: LSKey): 'success' | undefined => {
  try {
    if (!isStorageItemExist(key)) return undefined;
    localStorage.removeItem(key);

    return 'success';
  } catch (_error) {
    return undefined;
  }
};
