export const generateSrc = (playlist) => {
  let list = [];
  playlist.forEach((s) => (list = [...list, s.sound]));
  return list;
};