import { tsQuerySelector } from '../../helpers/helpers';
import state from '../../state/state';
import { updateColumnById, deleteColumn, updateSetOfColumns, getColumnById } from '../../API/columns';
import { getSpinner, removeSpinner } from '../spinner/spinner';

export const confirmEditColumns = async (e: Event, boardId: string) => {
  getSpinner();
  if (!(e.target instanceof HTMLElement)) return;
  const { target } = e;

  const columnId = <HTMLElement>target.closest('.column');

  const columnTitle = target.closest('.column-header')?.firstElementChild;
  const columnEditForm = target.closest('.title-settings')?.firstElementChild;
  const titleSettingEdit = target.closest('.title-settings')?.children[1];
  const columnTitleInput = <HTMLInputElement>target.closest('.title-settings')?.firstElementChild?.firstElementChild;

  const getColumn = await getColumnById(state.authToken, boardId, columnId.id);
  await updateColumnById(state.authToken, boardId, columnId.id, {
    title: columnTitleInput.value,
    order: getColumn.order,
  });

  if (columnTitle && titleSettingEdit && columnEditForm) {
    columnTitle.textContent = columnTitleInput.value;
    titleSettingEdit.classList.remove('hide');
    columnTitle.classList.remove('hide');
    columnEditForm.classList.add('hide');
  }

  removeSpinner();
};

export const deleteColumnInBoard = async (e: Event, boardId: string) => {
  if (!(e.target instanceof HTMLElement)) return;
  const { target } = e;
  const columnId = <HTMLElement>target.closest('.column');

  const currentElement = document.getElementById(columnId.id);
  if (currentElement) {
    currentElement.remove();
  }

  await deleteColumn(state.authToken, boardId, columnId.id);
  const columnsList = tsQuerySelector(document, '.columns-list');
  const columnsListArray = [...columnsList.children].map((column, index) => ({
    _id: column.id,
    order: index,
  }));

  await updateSetOfColumns(state.authToken, columnsListArray);
};

export const editColumns = async (e: Event) => {
  getSpinner();
  if (!(e.target instanceof HTMLElement)) return;
  const { target } = e;

  const titleSettingEdit = target.closest('.title-setting__edit');
  const columnTitle = target.closest('.column-header')?.firstElementChild;
  const columnEditForm = target.closest('.title-settings')?.firstElementChild;

  if (titleSettingEdit && columnTitle && columnEditForm) {
    titleSettingEdit.classList.add('hide');
    columnTitle.classList.add('hide');
    columnEditForm.classList.remove('hide');
  }

  removeSpinner();
};
