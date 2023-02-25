import addColumn from '../features/addColumn';
import createNewBoard from '../features/createNewBoard';
import invite from '../features/invite';
import inviteToTask from '../features/inviteToTask';
import getPrevMembersPage from '../features/getPrevMembersPage';
import getNextMembersPage from '../features/getNextMembersPage';
import getUserOptions from '../pages/navBar/getUserOptions';
import logOut from '../features/logOut';
import changeUserName from '../features/changeUserName';
import changeUserLogin from '../features/changeUserLogin';
import changePassword from '../features/changePassword';
import { resetCreateTaskForm, toggleTaskForm } from '../pages/taskForm/taskFormlistenerFunction';
import hideAside from '../features/hideAside/hideAside';
import showBurgerMenu from '../features/mobileLayout/mobileLayout';

export const BASE_URL = 'https://final-task-backend-production-c8c4.up.railway.app';
export const SIGN_UP_URL = `${BASE_URL}/auth/signup`;
export const SIGN_IN_URL = `${BASE_URL}/auth/signin`;
export const USERS_URL = `${BASE_URL}/users`;
export const BOARDS_URL = `${BASE_URL}/boards`;

export const COLUMNS_SET = `${BASE_URL}/columnsSet`;
export const TASKS_SET = `${BASE_URL}/tasksSet`;
export const POINTS = `${BASE_URL}/points`;

export const sliceNumber = -6;

export const FUNCTIONS = {
  'plus-board': createNewBoard,
  'plus-column': addColumn,
  'invite-button': invite,
  'invite-button_task': inviteToTask,
  'arrow-left': getPrevMembersPage,
  'arrow-right': getNextMembersPage,
  'create-card-action-cancel': resetCreateTaskForm,
  'new-card': toggleTaskForm,
  'user-active': getUserOptions,
  'user-name': getUserOptions,
  'user-img': getUserOptions,
  'logout-button': logOut,
  'change-name-button': changeUserName,
  'change-login-button': changeUserLogin,
  'change-password-button': changePassword,
  'hide-aside__button': hideAside,
  'burger-menu__button': showBurgerMenu,
};

export const LIGHT_COLORS = [
  '#FFD700',
  '#FFA07A',
  '#EEE8AA',
  '#90EE90',
  '#AFEEEE',
  '#ADD8E6',
  '#D8BFD8',
  '#FFB6C1',
  '#F5F5DC',
  '#FFF8DC',
  '#FFE4B5',
  '#FFF0F5',
  '#E6E6FA',
  '#F0FFFF',
  '#DCDCDC',
  '#FF7F50',
  '#BDB76B',
  '#9ACD32',
  '#8FBC8F',
  '#E0FFFF',
];

export const DRAG_N_DROP_ANIMATION_TIME = 200;
export const DRAG_N_DROP_GROUP_TASK = 'task';
export const DRAG_N_DROP_DIRECTION = 'horizontal';
export const DEFAULT_ERROR = 'Something went wrong';

export const MEMBERS_ON_PAGE = 6;

export const TIME_LESS_TEN = 10;

export const INVALID_TOKEN = 'Invalid token';
export const BOARD_DELETED = 'Board deleted';

export const DELAY = 3000;

interface Duration {
  [key: string]: number;
}

export const duration: Duration = {
  xs: 1,
  s: 2,
  m: 3,
  l: 4,
  xl: 6,
  xxl: 8,
};
