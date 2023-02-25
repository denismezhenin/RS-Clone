/* eslint-disable no-unused-vars */
import { FUNCTIONS } from '../constants/constants';

export interface ICreateUser {
  name: string;
  login: string;
  password: string;
}
export interface IState {
  authToken: string;
  id: string;
  boardId: string;
  name: string;
  password: string;
  pageLoaded: boolean;
  selectedUserId: string;
  selectedUserIdToTask: string;
  membersPage: number;
  members: string[];
  hideAside: boolean;
  theme: string;
  language: string;
  selectedTask: string;
}

export type Board = {
  _id: string;
  title: string;
  owner: string;
  users: string[];
};

export enum FormsData {
  name = 'name',
  email = 'email',
  password = 'password',
  signin = 'signin',
  signup = 'signup',
}

export enum FormsTaskData {
  color = 'color',
  title = 'title',
  description = 'description',
  duration = 'duration',
  priority = 'priority',
}

export interface IColumns {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}
export interface ITasks {
  _id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  users: string[];
}

export type sign = 'signin' | 'signup';

export enum taskForm {
  edit = 'edit',
  submit = 'submit',
  editTask = 'edit task',
  submitTask = 'submit task',
}

export type User = {
  _id: string;
  name: string;
  login: string;
};

export enum ToastrType {
  error = 'error',
  info = 'info',
  success = 'success',
  warning = 'warning',
}

export type FunctionsKeys = keyof typeof FUNCTIONS;

export interface Duration {
  [key: string]: number;
}
