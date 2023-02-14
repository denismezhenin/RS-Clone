import { tsQuerySelector } from '../helpers/helpers';

//  const showDropDownMenu = () => {
//   tsQuerySelector(document, '.task-menu__list').classList.toggle('hide')
// }

export const setTaskListener = () => {
  document.addEventListener('click', async (e) => {
    if (!(e.target instanceof HTMLElement)) return;
    const { target } = e;
    if (target.classList.contains('task-pop-up__menu')) {
      console.log('yes')
      // if (target.closest('.task') != null) {

      // }
      if (!target.closest('.task')) return
      const task = target.closest<HTMLElement>('.task');
      if (!task) return
      // task.classList.toggle('hide');
      tsQuerySelector(task, '.task-menu__list').classList.toggle('hide') 
    };
      // const board = tsQuerySelector(document, '.new-card__form')
      // const boardId = target.closest('.main-board')?.id
      // const columId = target.closest('.column')?.id
      // board.dataset.board = boardId
      // board.dataset.column = columId
    }
  );
}