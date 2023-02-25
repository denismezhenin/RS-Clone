import { ITasks } from '../../data/types';
import state from '../../state/state';
import getTaskContainer from '../../pages/tasksPage/getTaskContainer';

const reverseTaskList = async (userTasks: ITasks[]) => {
  const allStatusesCheckbox = <HTMLInputElement>document.querySelector('.all-statuses');
  allStatusesCheckbox.checked = true;

  const searchInput = <HTMLInputElement>document.querySelector('.search-input');
  searchInput.value = '';

  state.order = state.order === 'ASC' ? 'DESC' : 'ASC';
  document.querySelector('.rows')?.remove();

  getTaskContainer(userTasks);
};

export default reverseTaskList;
