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
  const columns = await getColumnsInBoard(token, boardId);
  console.log(columns)
  const arrayTasks = await getArrayTasks(token, columns, boardId);
  console.log(arrayTasks)
  return `
<ul class="colums-list" id="${boardId}">
${columns
  .map(
    (column: IColumns, index: number) => `
<li class="column" id="${column._id}">
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
