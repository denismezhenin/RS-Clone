import { createTask } from '../../API/tasks';
import { FormsTaskData } from '../../data/types';
import { tsQuerySelector } from '../../helpers/helpers';
import state from '../../state/state';
// eslint-disable-next-line import/no-cycle
import Boards from '../boards/boards';
import { createPoint } from '../../API/points';

const createTaskForm = async () => {
  const form = tsQuerySelector<HTMLFormElement>(document, '.new-card__form');
  const formData = new FormData(form);
  const title = String(formData.get(FormsTaskData.title));
  const color = String(formData.get(FormsTaskData.color));
  const description = String(formData.get(FormsTaskData.description));
  const duration = String(formData.get(FormsTaskData.duration));
  const priority = String(formData.get(FormsTaskData.priority));
  const boardId = form.dataset.board;
  const columnId = form.dataset.column;
  const users: Array<string> = [];
  const userId = state.id;
  const descriptionObject = {
    color,
    description,
    duration,
    priority,
  };
  if (!boardId || !columnId) return;
  const descriptionJSON = JSON.stringify(descriptionObject);
  const getCreatedTask = await createTask(state.authToken, boardId, columnId, {
    title,
    order: 0,
    description: descriptionJSON,
    userId,
    users,
  });
  console.log('getCreatedTask', getCreatedTask._id);
  createPoint(state.authToken, {
    title: 'string',
    taskId: getCreatedTask._id,
    boardId,
    done: false,
    startDate: '-',
    endDate: '-',
  });

  tsQuerySelector(document, '.new-card').classList.toggle('new-card__active');
  form.reset();
  Boards.after_render();
};

export const createTaskFormListener = () => {
  const form = tsQuerySelector<HTMLFormElement>(document, '.new-card__form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    createTaskForm();
  });
};

export default createTaskFormListener;
