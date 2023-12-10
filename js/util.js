const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getUniqueId = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    previousValues.push(currentValue);
    return currentValue;
  };
};

const createId = () => {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const findDuplicates = (arr) => {
  const duplicates = arr.filter((elem, index, elems) => elems.indexOf(elem) !== index);
  return duplicates.length !== 0;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const getRandomArrayElement = (arr) => arr[getRandomInteger(0, arr.length - 1)];

export {getRandomArrayElement, getRandomInteger, getUniqueId, createId, isEscapeKey, findDuplicates};
