import getRandomColor from './getRandomColor';
import getOppositeColor from './getOppositeColor';

const getUserIcon = (name: string, id: string) => {
  const letter = name[0].toUpperCase();
  const icon = document.createElement('a');
  icon.classList.add('user-icon');
  icon.textContent = letter;
  icon.dataset.memberId = id;
  const color = getRandomColor();
  icon.style.backgroundColor = color;
  icon.style.color = getOppositeColor(color);

  return icon;
};

export default getUserIcon;
