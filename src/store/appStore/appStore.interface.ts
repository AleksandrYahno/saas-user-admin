export interface IAppStore {
  version: number;
  setVersion: (value: number) => void;
}

export type ImmerAppStoreSetter = (fn: (store: IAppStore) => void) => void;
