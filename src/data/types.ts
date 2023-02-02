export interface ICreateUser {
  name: string;
  login: string;
  password: string;
}
export interface IState {
  authToken: string;
}

export enum FormsData {
  email = 'email',
  password = 'password',
}

export type sign = 'signin' | 'signup';
