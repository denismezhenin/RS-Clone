import i18next from 'i18next';
import getTaskHTML from '../tasks/taskInColumnsLayout';
import { getColumnsInBoard } from '../../API/columns';
import { IColumns } from '../../data/types';
import { getTasksInColumn } from '../../API/tasks';

const getArrayTasks = async (token: string, columns: IColumns[], boardId: string) => {
  const arrayPromises = columns.map((column: IColumns) => getTasksInColumn(token, boardId, column._id));
  const arrayTasks = await Promise.all(arrayPromises);
  return arrayTasks;
};

const getColumnHTML = async (token: string, boardId: string) => {
  const columns: IColumns[] = await getColumnsInBoard(token, boardId);

  if (columns.length === 0) {
    return '';
  }
  columns.sort((a, b) => a.order - b.order);
  const arrayTasks = await getArrayTasks(token, columns, boardId);

  return `
<ul class="columns-list">
${columns
  .map(
    (column: IColumns) => `
<li class="column" id='${column._id}'>
<div class="column-header">
<h3 class="column-title">${column.title}</h3>
<div class="title-settings">
  <div class='column-edit__form hide'>
    <input class='column-title__input' type='text' value=${column.title}>
    <button type="button" class='column-confirm-edit'><img class='confirm-img' src='../../assets/icons/done.svg'></button>
    <button type="button" class='column-delete__button'><img class='delete-img' src="../../assets/icons/delete-button.svg"></button>
  </div>
  <button type='button' class="title-setting__edit ${
    ['Todo', 'In progress', 'Done'].includes(column.title) ? 'hide' : ''
  }"><img src='../../assets/icons/edit-button.svg' alt='edit'></button>
  <img class="title-setting__add" src="../../assets/icons/plus.svg" alt="plus" />
</div>
</div>
<div class="column-body">
<div class="column-pop-up__menu hide">
  <ul class="column-menu__list">
    <li class="column-menu__item">${i18next.t('rename')}</li>
    <li class="column-menu__item">${i18next.t('delete')}</li>
  </ul>
</div>
<div class="column-tasks__container">
<ul class="tasks-list" id='tasks__list-${column._id}'>
  ${getTaskHTML(arrayTasks[column.order])}
  </ul>
</div>
</div>
</li>
`
  )
  .join('')}
</ul>
`;
};
export default getColumnHTML;
