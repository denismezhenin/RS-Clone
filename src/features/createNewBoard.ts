import UI from '../data/UI';
import state from '../state/state';
import togglePopup from './togglePopup';
import { createBoard } from '../API/boards';
import drawProjectsList from './drawProjectsList';
import popUpMessages from './popUpMessages/popupMessages';
import { ToastrType } from '../data/types';

const createNewBoard = async () => {
  document.querySelector('.shadow')?.remove();
  document.querySelector('.popup')?.remove();

  const popup = document.createElement('div');
  popup.classList.add('popup');
  const shadow = document.createElement('div');
  shadow.classList.add('shadow');
  document.body.append(shadow, popup);

  popup.classList.add('popup-active');
  shadow.classList.add('shadow-active');
  shadow.addEventListener('click', togglePopup);

  const header = document.createElement('h2');
  header.classList.add('new-board-header');
  header.textContent = UI.newBoardPopupHeader;

  const close = document.createElement('img');
  close.classList.add('close-sign');
  close.src = '../assets/icons/close.svg';
  close.addEventListener('click', togglePopup);
  header.append(close);

  const title = document.createElement('form');
  title.classList.add('new-board-form');
  const label = document.createElement('label');
  label.setAttribute('for', 'title');
  label.textContent = UI.titleLabel;
  const input = document.createElement('input');
  input.classList.add('input', 'new-board-input');
  input.type = 'text';
  input.id = 'title';
  input.placeholder = UI.titlePlaceholder;
  title.append(label, input);

  const boardImg = document.createElement('img');
  boardImg.classList.add('new-board-img');
  boardImg.src = '../assets/img/board.png';

  const text = document.createElement('p');
  text.classList.add('new-board-text');
  text.textContent = UI.newBoardDescription;

  const createBtn = document.createElement('button');
  createBtn.classList.add('button', 'create-button');
  createBtn.textContent = UI.newBoardButton;
  createBtn.addEventListener('click', togglePopup);

  popup.append(header, title, boardImg, createBtn);

  createBtn.addEventListener('click', () => {
    const resultTitle = input.value !== '' ? input.value : UI.titlePlaceholder;
    createBoard(state.authToken, { title: resultTitle, owner: state.id, users: [] })
      .then(() => {
        drawProjectsList();
        state.selectedUserId = '';
        popUpMessages(ToastrType.success, 'New project created');
      })
      .then(() => {
        window.location.hash = `/project/${state.boardId}`;
      });
  });
};

export default createNewBoard;
