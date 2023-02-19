import i18next from 'i18next';
import state from '../state/state';
import togglePopup from './togglePopup';
import { createBoard } from '../API/boards';
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
  header.textContent = i18next.t('newBoardPopupHeader');

  const close = document.createElement('img');
  close.classList.add('close-sign');
  close.src = '../assets/icons/close.svg';
  close.addEventListener('click', togglePopup);
  header.append(close);

  const title = document.createElement('form');
  title.classList.add('new-board-form');
  const label = document.createElement('label');
  label.setAttribute('for', 'title');
  label.textContent = i18next.t('titleLabel');
  const input = document.createElement('input');
  input.classList.add('input', 'new-board-input');
  input.type = 'text';
  input.id = 'title';
  input.placeholder = i18next.t('titlePlaceholder');
  title.append(label, input);

  const boardImg = document.createElement('img');
  boardImg.classList.add('new-board-img');
  boardImg.src = '../assets/img/board.png';

  const text = document.createElement('p');
  text.classList.add('new-board-text');
  text.textContent = i18next.t('newBoardDescription');

  const createBtn = document.createElement('button');
  createBtn.classList.add('button', 'create-button');
  createBtn.textContent = i18next.t('newBoardButton');
  createBtn.addEventListener('click', togglePopup);

  popup.append(header, title, boardImg, createBtn);

  createBtn.addEventListener('click', () => {
    const resultTitle = input.value !== '' ? input.value : i18next.t('titlePlaceholder');
    createBoard(state.authToken, { title: resultTitle, owner: state.id, users: [state.id] })
      .then(() => {
        state.selectedUserId = '';
        popUpMessages(ToastrType.success, i18next.t('newBoardMessage'));
      })
      .then(() => {
        window.location.hash = `/projects/${state.boardId}`;
      });
  });
};

export default createNewBoard;
