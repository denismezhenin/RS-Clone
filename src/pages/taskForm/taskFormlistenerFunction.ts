import { tsQuerySelector } from '../../helpers/helpers';

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
      tsQuerySelector(document, '.new-card').classList.toggle('new-card__active');
      const board = tsQuerySelector(document, '.new-card__form');
      const boardId = target.closest('.main-board')?.id;
      const columId = target.closest('.column')?.id;
      board.dataset.board = boardId;
      board.dataset.column = columId;
    }
  });
};
