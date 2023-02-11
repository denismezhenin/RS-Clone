import addColumn from '../features/addColumn';
import createNewBoard from '../features/createNewBoard';
import invite from '../features/invite';

export const BASE_URL = 'https://best-team-api.up.railway.app';
export const SIGN_UP_URL = `${BASE_URL}/auth/signup`;
export const SIGN_IN_URL = `${BASE_URL}/auth/signin`;
export const USERS_URL = `${BASE_URL}/users`;
export const BOARDS_URL = `${BASE_URL}/boards/`;
export const COLUMNS_SET = `${BASE_URL}/columnsSet`;
export const TASKS_SET = `${BASE_URL}/tasksSet`;
export const POINTS = `${BASE_URL}/points`;

export const sliceNumber = -6;

export const FUNCTIONS = {
  'plus-board': createNewBoard,
  'plus-column': addColumn,
  'invite-button': invite,
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

export const TIME_LESS_TEN = 10;
