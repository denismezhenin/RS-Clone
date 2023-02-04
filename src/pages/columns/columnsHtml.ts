import getTaskHTML from '../tasks/taskInColumnsLayout';
import { getColumnsInBoard } from '../../API/columns';
import { IColumns } from '../../data/types';
import getTasksInColumn from '../../API/tasks';

const getColumnHTML = async (token: string, boardId: string) => {
  const columns = await getColumnsInBoard(token, boardId);
  const arrayPromises = columns.map((colum: IColumns) => getTasksInColumn(token, boardId, colum._id));
  const arrayTasks = await Promise.all(arrayPromises);
  return `
<ul class="colums-list">
${columns
  .map(
    (column: IColumns, index: number) => `
<li class="column">
<div class="column-header">
<h3 class="column-title">${column.title}</h3>
<div class="title-settings">
  <div class="title-setting__edit"></div>
  <img class="title-setting__add" src="../../assets/icons/plus.svg" alt="plus" />
</div>
</div>
<div class="column-body">
<div class="column-pop-up__menu hide">
  <ul class="column-menu__list">
    <li class="column-menu__item">Rename</li>
    <li class="column-menu__item">Delete</li>
  </ul>
</div>
<div class="column-tasks__container">
  ${getTaskHTML(arrayTasks[index])}
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
