import { ITasks } from '../../data/types';
import getTaskContainer from '../../pages/tasksPage/getTaskContainer';
import state from '../../state/state';

const searchByTasks = async (event: Event) => {
  if (event.target && event.target instanceof HTMLInputElement) {
    const { target } = event;
    const value = target.value.trim();

    const allStatusesCheckbox = <HTMLInputElement>document.querySelector('.all-statuses');

    let tasks: ITasks[] = [];
    if (!allStatusesCheckbox.checked) {
      tasks = state.filteredTasks;
    } else {
      tasks = state.tasks;
    }

    if (value !== '') {
      const found = tasks.filter((el) => el.title.includes(value));
      document.querySelector('.rows')?.remove();
      state.foundTasks = [...found];
      await getTaskContainer();
    } else {
      document.querySelector('.rows')?.remove();
      state.foundTasks.length = 0;
      await getTaskContainer();
    }
  }
};

export default searchByTasks;
