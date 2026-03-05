import { describe, it, expect, beforeEach } from 'vitest';

import {
  getStorageItem,
  isStorageItemExist,
  removeStorageItem,
  replaceStorageItemField,
  setStorageItem,
} from '@helpers/localStorageConnector/localStorage';
import { LSKeys } from '@helpers/localStorageConnector/localStorageKeys.enum';

describe('localStorage helpers', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('sets and gets value', () => {
    const value = { foo: 'bar' };

    setStorageItem(LSKeys.APP_STATE, value);

    const stored = getStorageItem<typeof value>(LSKeys.APP_STATE);

    expect(stored).toEqual(value);
  });

  it('detects existence and removes item', () => {
    expect(isStorageItemExist(LSKeys.APP_STATE)).toBe(false);

    setStorageItem(LSKeys.APP_STATE, { foo: 'bar' });
    expect(isStorageItemExist(LSKeys.APP_STATE)).toBe(true);

    const result = removeStorageItem(LSKeys.APP_STATE);
    expect(result).toBe('success');
    expect(isStorageItemExist(LSKeys.APP_STATE)).toBe(false);
  });

  it('replaces partial state', () => {
    interface State { foo: string; count: number }

    setStorageItem<State>(LSKeys.APP_STATE, {
      foo: 'bar',
      count: 1,
    });

    const updated = replaceStorageItemField<State>(LSKeys.APP_STATE, {
      count: 2,
    });

    expect(updated).toEqual({
      foo: 'bar',
      count: 2,
    });
  });
});

