import i18next from 'i18next';
import { createColumns, getColumnsInBoard, updateColumnById } from '../API/columns';
import UI from '../data/UI';
import state from '../state/state';
import getColumnHTML from '../pages/columns/columnsHtml';
import getBoardId from '../services/getBoardId';
import dragNdropTasks from './drag-n-drop/drag-n-dropTasks';
import dragNdropColumns from './drag-n-drop/drag-n-dropColumns';
import { tsQuerySelectorAll } from '../helpers/helpers';
import { confirmEditColumns, deleteColumnInBoard, editTitle } from './columns/EditColumns';
import { IColumns, ToastrType } from '../data/types';
import popUpMessages from './popUpMessages/popupMessages';

const addColumn = async () => {
  const boardId = getBoardId();
  const columns: IColumns[] = await getColumnsInBoard(state.authToken, boardId);
  const doneColumnOrder = columns.length - 1;
  const columnList = document.querySelector('.columns-list');
  await createColumns(state.authToken, boardId, {
    title: i18next.t('newColumnName'),
    order: doneColumnOrder,
  });

  const doneColumn = columns.find((el) => el.title === UI.thirdColumnName || el.title === 'Сделано');
  if (doneColumn) {
    await updateColumnById(state.authToken, boardId, doneColumn._id, {
      title: doneColumn.title,
      order: doneColumnOrder + 1,
    });
  }

  const result = await getColumnHTML(state.authToken, boardId);
  if (columnList) {
    columnList.outerHTML = result;
    popUpMessages(ToastrType.success, i18next.t('newColumnCreatedMessage'));
  }
  await dragNdropColumns();
  await dragNdropTasks();

  const titleSettingEdit = tsQuerySelectorAll(document, '.title-setting__edit');
  titleSettingEdit.forEach((el) =>
    el.addEventListener('click', async (e) =>
      editTitle(e, '.column', '.title-setting__edit', '.column-title', '.column-edit__form')
    )
  );

  const columnCofirmEdit = tsQuerySelectorAll(document, '.column-confirm-edit');
  columnCofirmEdit.forEach((el) => {
    el.addEventListener('click', (e) => confirmEditColumns(e, boardId));
  });

  const columnDeleteButton = tsQuerySelectorAll(document, '.column-delete__button');
  columnDeleteButton.forEach((el) => {
    el.addEventListener('click', (e) => deleteColumnInBoard(e, boardId));
  });
};

export default addColumn;
