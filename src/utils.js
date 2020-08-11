
export const getRandomInteger = (from = 0, to = 1) => {
  const lower = Math.ceil(Math.min(from, to));
  const upper = Math.floor(Math.max(from, to));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomElement = (elements) => {
  const randomIndex = getRandomInteger(0, elements.length - 1);

  return elements[randomIndex];
};

export const generateArrayFromSet = (array, minElementsCount, maxElementsCount) => {
  const newSet = new Set();

  for (let i = minElementsCount; i < maxElementsCount; i++) {
    const randomElement = getRandomElement(array);

    newSet.add(randomElement);
  }

  return Array.from(newSet);
};

export const render = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};
