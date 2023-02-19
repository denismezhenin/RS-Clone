import { IState } from '../data/types';
import listen from '../features/listen';

const state: IState = {
  authToken: '',
  id: '',
  boardId: '',
  name: '',
  password: '',
  pageLoaded: false,
  selectedUserId: '',
  membersPage: 1,
  members: [],
  hideAside: false,
  theme: '',
  language: '',
  selectedTask: '',
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
    state.password = temp.password;
    state.theme = temp.theme;
    state.language = temp.language;

    window.addEventListener('click', listen);
  }
};

window.addEventListener('load', getLocalStorage);

const setLocalStorage = () => {
  localStorage.setItem('state', JSON.stringify(state));
};

window.addEventListener('beforeunload', setLocalStorage);
export default state;
