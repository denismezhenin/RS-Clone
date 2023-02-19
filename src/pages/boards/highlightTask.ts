import state from '../../state/state';
import { DELAY } from '../../constants/constants';

const highlightTask = async () => {
  const targetTaskElement = document.getElementById(state.selectedTask);
  targetTaskElement?.setAttribute('name', 'target');

  targetTaskElement?.classList.add('highlighted');
  setTimeout(() => targetTaskElement?.classList.remove('highlighted'), DELAY);
};

export default highlightTask;
