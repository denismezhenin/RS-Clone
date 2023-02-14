import { getBoardsById, updateBoard } from '../API/boards';
import getBoardId from '../services/getBoardId';
import state from '../state/state';
import getBoardIcons from '../pages/boards/getBoardIcons';

const invite = async () => {
  const membersSelect = document.querySelector('.members-select');
  const boardId = getBoardId();
  const board = await getBoardsById(state.authToken, boardId);
  const options = document.querySelectorAll('option');
  const array = board.users;

  if (membersSelect instanceof HTMLSelectElement) {
    let id = state.selectedUserId;
    if (id === '') {
      const dataId = options[0].getAttribute('data-member-id');
      if (dataId) {
        id = dataId;
      }
    }
    if (!array.includes(id)) {
      array.push(id);
      await updateBoard(state.authToken, boardId, { title: board.title, owner: id, users: array });
      getBoardIcons(array);
      options.forEach((item) => {
        const dataId = item.getAttribute('data-member-id');
        if (dataId === id) {
          item.remove();
        }
      });
      state.selectedUserId = '';
    }
  }
};

export default invite;
