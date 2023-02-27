import { tsQuerySelector } from '../helpers/helpers';
import { editThisTask, deleteThisTask, showDropDownMenu } from './taskFunctions';

const setTaskListener = async () => {
  document.addEventListener('click', async (e) => {
    if (!(e.target instanceof HTMLElement)) return;
    const { target } = e;
    if (target.classList.contains('task-pop-up__menu')) {
      showDropDownMenu(target);
      return;
    }
    // if (target.closest('edit-task')) console.log('d')
    // console.log(target.closest('edit-task'))
    // console.log(target.parentElement?.classList.contains('edit-task'))
    if (target.classList.contains('edit-task') || target.parentElement?.classList.contains('edit-task')) {
      editThisTask(target);
    }
    if (target.classList.contains('delete-task') || target.parentElement?.classList.contains('delete-task')) {
      deleteThisTask(target);
    }
    if (!target.closest('.task-menu__list')) {
      const tasks = document.querySelectorAll<HTMLElement>('.task');
      tasks.forEach((el) => {
        const menu = tsQuerySelector(el, '.task-menu__list');
        if (!menu.classList.contains('hide')) showDropDownMenu(el);
      });
    }
  });
};

export default setTaskListener;
