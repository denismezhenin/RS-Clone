import getRandomColor from './getRandomColor';
import getOppositeColor from './getOppositeColor';

const getUserIcon = (name: string) => {
  const letter = name[0].toUpperCase();
  const icon = document.createElement('div');
  icon.classList.add('user-icon');
  icon.textContent = letter;

  const color = getRandomColor();
  icon.style.backgroundColor = color;
  icon.style.color = getOppositeColor(color);

  return icon;
};

export default getUserIcon;
