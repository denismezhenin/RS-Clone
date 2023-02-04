export interface ICreateUser {
  name: string;
  login: string;
  password: string;
}
export interface IState {
  authToken: string;
}
export interface IColumns {
  boardId: string;
  order: number;
  title: string;
  _id: string;
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
