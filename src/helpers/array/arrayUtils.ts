const removeItemById = <T>(
  array: T[],
  value: T[keyof T],
  fieldName?: keyof T,
): T[] => {
  const currentFieldName = fieldName ?? 'id';

  return array.filter((item) => item[currentFieldName as keyof T] !== value);
};

const getItemById = <T>(
  array: T[],
  itemId: T[keyof T],
  fieldName?: keyof T,
): T | undefined => {
  const currentFieldName = fieldName ?? 'id';

  return array.find((item: T) => item[currentFieldName as keyof T] === itemId);
};

const replaceItem = <T>(
  array: T[],
  item: T,
  fieldName?: keyof T,
): T[] => {
  const currentFieldName = fieldName ?? 'id';
  const newArray = [...array];
  const foundIndex =
    array.findIndex((itemFromList) => item[currentFieldName as keyof T] === itemFromList[currentFieldName as keyof T]);
  newArray[foundIndex] = item;

  return newArray;
};

const addItemLast = <T>(
  array: T[],
  item: T,
): T[] => {
  return [
    ...array,
    item,
  ];
};

export {
  getItemById,
  removeItemById,
  replaceItem,
  addItemLast,
};

