import { getColumnById } from '../../API/columns';
import { IColumns, ITasks } from '../../data/types';
import state from '../../state/state';
import getTaskContainer from '../../pages/tasksPage/getTaskContainer';

const filterTasks = async (event: Event) => {
  const { target } = event;
  if (target instanceof HTMLInputElement) {
    const searchInput = <HTMLInputElement>document.querySelector('.search-input');
    let tasks: ITasks[] = [];

    if (searchInput.value !== '') {
      tasks = state.foundTasks;
    } else {
      tasks = state.tasks;
    }

    const filtered: ITasks[] = [];
    const promises: Promise<IColumns>[] = [];
    tasks.forEach(async (el) => promises.push(getColumnById(state.authToken, el.boardId, el.columnId)));

    Promise.all(promises)
      .then(() => {
        tasks.forEach(async (item, i) => {
          if (
            target.classList.contains('todo') &&
            ((await promises[i]).title === 'Todo' || (await promises[i]).title === 'Выполнить')
          ) {
            filtered.push(item);
          }
          if (
            target.classList.contains('in-progress') &&
            ((await promises[i]).title === 'In progress' || (await promises[i]).title === 'В работе')
          ) {
            filtered.push(item);
          }
          if (
            target.classList.contains('done') &&
            ((await promises[i]).title === 'Done' || (await promises[i]).title === 'Сделано')
          ) {
            filtered.push(item);
          }
        });
      })
      .then(() => {
        state.filteredTasks = [...filtered];
      })
      .then(async () => {
        document.querySelector('.rows')?.remove();
        await getTaskContainer();
      });
  }
};

export default filterTasks;
