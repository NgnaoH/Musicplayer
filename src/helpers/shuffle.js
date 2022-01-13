export const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (Number(currentIndex) !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const generateSrc = (playlist) => {
  let list = [];
  playlist.forEach((s) => (list = [...list, s.sound]));
  return list;
};