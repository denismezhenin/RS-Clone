import { tsQuerySelector } from '../../helpers/helpers';

const formsParam = (target: HTMLElement) => {
  tsQuerySelector(document, '.new-card').classList.toggle('new-card__active');
  const board = tsQuerySelector(document, '.new-card__form');
  const boardId = target.closest('.main-board')?.id;
  const columId = target.closest('.column')?.id;
  const taskId = target.closest<HTMLElement>('.task')?.id;
  board.dataset.board = boardId;
  board.dataset.column = columId;
  board.dataset.task = taskId;
};

export default formsParam;
