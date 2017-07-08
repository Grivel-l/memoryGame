const getRandomNbr = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getHighlights = (highlightsNbr, tilesNbr) => {
  const highlights = {};
  const getNext = () => {
    highlights[`${getRandomNbr(0, tilesNbr - 1)}${getRandomNbr(0, tilesNbr - 1)}`] = false;
    if (Object.keys(highlights).length < highlightsNbr) {
      getNext();
    }
  };
  getNext();

  return highlights;
};

export default getHighlights;
