import { createColumns } from '../API/columns';
import UI from '../data/UI';
import state from '../state/state';
import getColumnHTML from '../pages/columns/columnsHtml';
import getBoardId from '../services/getBoardId';
import dragNdropTasks from './drag-n-drop/drag-n-dropTasks';
import dragNdropColumns from './drag-n-drop/drag-n-dropColumns';

const addColumn = async () => {
  const boardId = getBoardId();
  const columnList = document.querySelector('.columns-list');
  await createColumns(state.authToken, boardId, {
    title: UI.newColumnName,
    order: 0,
  });
  const result = await getColumnHTML(state.authToken, boardId);
  if (columnList) {
    columnList.outerHTML = result;
  }
  dragNdropColumns();
  dragNdropTasks();
};

export default addColumn;
