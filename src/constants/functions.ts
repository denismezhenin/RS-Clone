import addColumn from '../features/addColumn';
import createNewBoard from '../features/createNewBoard';
import invite from '../features/invite';
import getPrevMembersPage from '../features/getPrevMembersPage';
import getNextMembersPage from '../features/getNextMembersPage';
import getUserOptions from '../pages/navBar/getUserOptions';
import logOut from '../features/logOut';
import { resetCreateTaskForm, toggleTaskForm } from '../pages/taskForm/taskFormlistenerFunction';

const FUNCTIONS = {
  'plus-board': createNewBoard,
  'plus-column': addColumn,
  'invite-button': invite,
  'arrow-left': getPrevMembersPage,
  'arrow-right': getNextMembersPage,
  'create-card-action-cancel': resetCreateTaskForm,
  'new-card': toggleTaskForm,
  'user-active': getUserOptions,
  'user-name': getUserOptions,
  'user-img': getUserOptions,
  'logout-button': logOut,
};

export default FUNCTIONS;
