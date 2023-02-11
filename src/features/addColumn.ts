import { createColumns } from '../API/columns';
import UI from '../data/UI';
import state from '../state/state';
import getColumnHTML from '../pages/columns/columnsHtml';
import getBoardId from '../services/getBoardId';
import dragNdropTasks from './drag-n-drop/drag-n-dropTasks';
import dragNdropColumns from './drag-n-drop/drag-n-dropColumns';
import { tsQuerySelectorAll } from '../helpers/helpers';
import { confirmEditColumns, deleteColumnInBoard, editColumns } from './columns/EditColumns';

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

  const titleSettingEdit = tsQuerySelectorAll(document, '.title-setting__edit');
  titleSettingEdit.forEach((el) => el.addEventListener('click', async (e) => await editColumns(e, boardId)));

  const columnCofirmEdit = tsQuerySelectorAll(document, '.column-cofirm-edit');
  columnCofirmEdit.forEach((el) => {
    el.addEventListener('click', (e) => confirmEditColumns(e, boardId));
  });

  const columnDeleteButton = tsQuerySelectorAll(document, '.column-delete__button');
  columnDeleteButton.forEach((el) => {
    el.addEventListener('click', (e) => deleteColumnInBoard(e, boardId));
  });
};

export default addColumn;
