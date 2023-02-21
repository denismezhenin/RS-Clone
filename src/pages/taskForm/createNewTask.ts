import { createTask, updateTask } from '../../API/tasks';
import { FormsTaskData, taskForm } from '../../data/types';
import { getInvitedUsers } from '../../features/inviteToTask';
import { tsQuerySelector } from '../../helpers/helpers';
import state from '../../state/state';
import { createPoint } from '../../API/points';
import { reloadBoard } from '../../features/taskFunctions';

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
  const taskId = form.dataset.task;
  const users: Array<string> = Array.from(getInvitedUsers());
  const userId = state.id;
  const { type } = form.dataset;
  const descriptionObject = {
    color,
    description,
    duration,
    priority,
  };
  if (!boardId || !columnId || !type || !taskId) return;
  const descriptionJSON = JSON.stringify(descriptionObject);
  if (type === taskForm.submit) {
    const getCreatedTask = await createTask(state.authToken, boardId, columnId, {
      title,
      order: 0,
      description: descriptionJSON,
      userId,
      users,
    });
    createPoint(state.authToken, {
      title: 'string',
      taskId: getCreatedTask._id,
      boardId,
      done: false,
      startDate: '-',
      endDate: '-',
    });
  } else {
    await updateTask(state.authToken, boardId, columnId, taskId, {
      title,
      order: 0,
      description: descriptionJSON,
      columnId,
      userId,
      users,
    });
  }
  tsQuerySelector(document, '.new-card').classList.toggle('new-card__active');
  form.reset();
  reloadBoard();
};

const createTaskFormListener = async () => {
  const form = tsQuerySelector<HTMLFormElement>(document, '.new-card__form');
  form.addEventListener('submit', async (e) => {
    console.log('submit')
    e.preventDefault();
    createTaskForm();
  });
};

export default createTaskFormListener;
