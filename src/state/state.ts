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

export default state;
