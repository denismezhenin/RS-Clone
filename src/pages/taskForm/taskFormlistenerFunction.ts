import { taskForm } from '../../data/types';
import { tsQuerySelector } from '../../helpers/helpers';
import formsParam from './setTaskParams';

export const resetCreateTaskForm = () => {
  tsQuerySelector(document, '.new-card').classList.toggle('new-card__active');
  tsQuerySelector<HTMLFormElement>(document, '.new-card__form').reset();
};

export const toggleTaskForm = () => {
  tsQuerySelector(document, '.new-card').classList.toggle('new-card__active');
};

export const setNewTaskFormListener = async () => {
  document.addEventListener('click', async (e) => {
    if (!(e.target instanceof HTMLElement)) return;
    const { target } = e;
    if (target.classList.contains('title-setting__add')) {
      formsParam(target, taskForm.submit);
    }
  });
};
