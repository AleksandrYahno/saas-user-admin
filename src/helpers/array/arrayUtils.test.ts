import {
  addItemLast,
  getItemById,
  removeItemById,
  replaceItem,
} from './arrayUtils';

interface ITestItem {
  id: number;
  value: string;
}

const buildItems = (): ITestItem[] => [
  {
    id: 1,
    value: 'one',
  },
  {
    id: 2,
    value: 'two',
  },
  {
    id: 3,
    value: 'three',
  },
];

describe('arrayUtils', () => {
  describe('getItemById', () => {
    it('returns item by id when exists', () => {
      const items = buildItems();

      const result = getItemById(items, 2);

      expect(result).toEqual({
        id: 2,
        value: 'two',
      });
    });

    it('returns undefined when item not found', () => {
      const items = buildItems();

      const result = getItemById(items, 999);

      expect(result).toBeUndefined();
    });
  });

  describe('removeItemById', () => {
    it('removes item by id', () => {
      const items = buildItems();

      const result = removeItemById(items, 2);

      expect(result).toEqual([
        {
          id: 1,
          value: 'one',
        },
        {
          id: 3,
          value: 'three',
        },
      ]);
    });

    it('returns same array when id is not found', () => {
      const items = buildItems();

      const result = removeItemById(items, 999);

      expect(result).toEqual(items);
    });
  });

  describe('replaceItem', () => {
    it('replaces item by id', () => {
      const items = buildItems();

      const newItem: ITestItem = {
        id: 2,
        value: 'two updated',
      };

      const result = replaceItem(items, newItem);

      expect(result).toEqual([
        {
          id: 1,
          value: 'one',
        },
        {
          id: 2,
          value: 'two updated',
        },
        {
          id: 3,
          value: 'three',
        },
      ]);
    });
  });

  describe('addItemLast', () => {
    it('adds item to the end of array', () => {
      const items = buildItems();

      const result = addItemLast(items, {
        id: 4,
        value: 'four',
      });

      expect(result).toEqual([
        {
          id: 1,
          value: 'one',
        },
        {
          id: 2,
          value: 'two',
        },
        {
          id: 3,
          value: 'three',
        },
        {
          id: 4,
          value: 'four',
        },
      ]);
    });
  });
});

