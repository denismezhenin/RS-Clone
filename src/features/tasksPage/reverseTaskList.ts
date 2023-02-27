import state from '../../state/state';
import getTaskContainer from '../../pages/tasksPage/getTaskContainer';

const reverseTaskList = async () => {
  state.order = state.order === 'ASC' ? 'DESC' : 'ASC';
  document.querySelector('.rows')?.remove();

  getTaskContainer();
};

export default reverseTaskList;
