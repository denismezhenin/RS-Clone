import { LIGHT_COLORS } from '../constants/constants';

const getRandomColor = () => {
  const randomColor = Math.floor(Math.random() * LIGHT_COLORS.length);
  return LIGHT_COLORS[randomColor];
};

export default getRandomColor;
