import { tsQuerySelector } from '../../helpers/helpers';
import state from '../../state/state';
import { getBoardsById, updateBoard } from '../../API/boards';

const consfirmEditBoard = async (e: Event) => {
  if (!(e.target instanceof HTMLElement)) return;
  const { target } = e;
  e.stopPropagation();

  const boardTitleInput = <HTMLInputElement>(
    tsQuerySelector(<HTMLElement>target.closest('.project-card'), '.board-title__input')
  );
  const boardSettingEdit = tsQuerySelector(<HTMLElement>target.closest('.project-card'), '.board-setting__edit');
  const projectTitle = tsQuerySelector(<HTMLElement>target.closest('.project-card'), '.project-title');
  const boardEditForm = tsQuerySelector(<HTMLElement>target.closest('.project-card'), '.board-edit__form');

  const projectCard = <HTMLElement>target.closest('.project-card');
  const projectId = projectCard.id.split('-')[1];

  const projectCart = await getBoardsById(state.authToken, projectId);

  await updateBoard(state.authToken, projectId, {
    title: boardTitleInput.value,
    owner: projectCart.owner,
    users: projectCart.users,
  });

  if (projectTitle && boardSettingEdit && boardEditForm) {
    projectTitle.textContent = boardTitleInput.value;
    boardSettingEdit.classList.remove('hide');
    projectTitle.classList.remove('hide');
    boardEditForm.classList.add('hide');
  }
};
export default consfirmEditBoard;
