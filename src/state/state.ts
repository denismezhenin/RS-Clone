import { IState } from '../data/types';

const state: IState = {
  authToken: '',
  id: '',
  boardId: '',
  name: '',
  pageLoaded: false,
  selectedUserId: '',
  membersPage: 1,
  members: [],
  hideAside: false,
};

const getLocalStorage = () => {
  if (localStorage.getItem('state')) {
    const temp: IState = { ...JSON.parse(localStorage.getItem('state')!) };

    state.authToken = temp.authToken;
    state.name = temp.name;
    state.id = temp.id;
    state.boardId = temp.boardId;
    state.pageLoaded = temp.pageLoaded;
    state.selectedUserId = temp.selectedUserId;
    state.membersPage = temp.membersPage;
    state.members = temp.members;
    state.hideAside = temp.hideAside;
  }
};

window.addEventListener('load', getLocalStorage);

const setLocalStorage = () => {
  localStorage.setItem('state', JSON.stringify(state));
};

window.addEventListener('beforeunload', setLocalStorage);
export default state;
