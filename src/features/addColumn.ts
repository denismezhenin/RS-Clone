import { createColumns, getColumnsInBoard, updateColumnById } from '../API/columns';
import UI from '../data/UI';
import state from '../state/state';
import getColumnHTML from '../pages/columns/columnsHtml';
import getBoardId from '../services/getBoardId';
import dragNdropTasks from './drag-n-drop/drag-n-dropTasks';
import dragNdropColumns from './drag-n-drop/drag-n-dropColumns';
import { IColumns } from '../data/types';

const addColumn = async () => {
  const boardId = getBoardId();
  const columns: IColumns[] = await getColumnsInBoard(state.authToken, boardId);
  const doneColumnOrder = columns.length - 1;
  const columnList = document.querySelector('.columns-list');
  await createColumns(state.authToken, boardId, {
    title: UI.newColumnName,
    order: doneColumnOrder - 1,
  });

  const doneColumn = columns.find((el) => el.title === UI.thirdColumnName);
  if (doneColumn) {
    await updateColumnById(state.authToken, boardId, doneColumn._id, {
      title: doneColumn.title,
      order: doneColumnOrder + 1,
    });
  }

  const result = await getColumnHTML(state.authToken, boardId);
  if (columnList) {
    columnList.outerHTML = result;
  }
  dragNdropColumns();
  dragNdropTasks();
};

export default addColumn;
