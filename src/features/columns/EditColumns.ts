import { tsQuerySelector, tsQuerySelectorAll } from '../../helpers/helpers';
import state from '../../state/state';
import {
  updateColumnById,
  deleteColumn,
  getColumnsInBoard,
  updateSetOfColumns,
  getColumnById,
} from '../../API/columns';
import { IColumns } from '../../data/types';
import { getSpinner, removeSpinner } from '../spinner/spinner';

export const confirmEditColumns = async (e: Event, boardId: string) => {
  getSpinner();
  if (!(e.target instanceof HTMLElement)) return;
  const { target } = e;

  const columnId = target.closest('.column')!.id;

  const columnTitle = target.closest('.column-header')?.firstElementChild;
  const columnEditForm = target.closest('.title-settings')?.firstElementChild;
  const titleSettingEdit = target.closest('.title-settings')?.children[1];
  const columnTitleInput = target.closest('.title-settings')?.firstElementChild?.firstElementChild as HTMLInputElement;

  const getColumn = await getColumnById(state.authToken, boardId, target.closest('.column')!.id);
  await updateColumnById(state.authToken, boardId, columnId, { title: columnTitleInput.value, order: getColumn.order });

  columnTitle ? (columnTitle.textContent = columnTitleInput.value) : null;
  titleSettingEdit ? titleSettingEdit.classList.remove('hide') : null;
  columnTitle ? columnTitle.classList.remove('hide') : null;
  columnEditForm ? columnEditForm.classList.add('hide') : null;
  removeSpinner();
};

export const deleteColumnInBoard = async (e: Event, boardId: string) => {
  if (!(e.target instanceof HTMLElement)) return;
  const { target } = e;
  const columnId = target.closest('.column')!.id;

  const currentElement = document.getElementById(columnId);
  if (currentElement) {
    currentElement.remove();
  }

  await deleteColumn(state.authToken, boardId, columnId);
  const columns: IColumns[] = await getColumnsInBoard(state.authToken, boardId);
  const columnsList = tsQuerySelector(document, '.columns-list');
  const columnsListArray = [...columnsList.children].map((column, index) => ({
    _id: column.id,
    order: index,
  }));

  await updateSetOfColumns(state.authToken, columnsListArray);
};

export const editColumns = async (e: Event, boardId: string) => {
  getSpinner();
  if (!(e.target instanceof HTMLElement)) return;
  const { target } = e;

  const titleSettingEdit = target.closest('.title-setting__edit');
  const columnTitle = target.closest('.column-header')?.firstElementChild;
  const columnEditForm = target.closest('.title-settings')?.firstElementChild;

  await getColumnById(state.authToken, boardId, target.closest('.column')!.id);

  titleSettingEdit ? titleSettingEdit.classList.add('hide') : null;
  columnTitle ? columnTitle.classList.add('hide') : null;
  columnEditForm ? columnEditForm.classList.remove('hide') : null;
  removeSpinner();
};
