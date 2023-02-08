import { createTask } from '../../API/tasks';
import { FormsTaskData } from '../../data/types';
import { tsQuerySelector } from '../../helpers/helpers';
import state from '../../state/state';

const createTaskForm = async () => {
  const form = tsQuerySelector<HTMLFormElement>(document, '.new-card__form');

  const formData = new FormData(form);

  const title = String(formData.get(FormsTaskData.title));
  const color = String(formData.get(FormsTaskData.color));
  const description = String(formData.get(FormsTaskData.description));
  const startDate = String(formData.get(FormsTaskData.startDate));
  const endDate = String(formData.get(FormsTaskData.endDate));
  const priority = String(formData.get(FormsTaskData.priority));
  const boardId = form.dataset.board;
  const columnId = form.dataset.column;
  const users: Array<string> = [];
  const userId = state.id;
  const descriptionObject = {
    color,
    description,
    startDate,
    endDate,
    priority,
  };
  if (!boardId || !columnId) return;
  const descriptionJSON = JSON.stringify(descriptionObject);
  const response = await createTask(state.authToken, boardId, columnId, {
    title,
    order: 0,
    description: descriptionJSON,
    userId,
    users,
  });
  console.log(response)
  tsQuerySelector(document, '.new-card').classList.toggle('new-card__active');
  // if (!response) {
  // }
  // window.location.href = '#/signin';
};

const createTaskFormListener = () => {
  // if (state.pageLoaded) return;
  // state.pageLoaded = true;
  const form = tsQuerySelector<HTMLFormElement>(document, '.new-card__form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    createTaskForm();
  });
};

export default createTaskFormListener;
