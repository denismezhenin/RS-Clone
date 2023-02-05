export interface ICreateUser {
  name: string;
  login: string;
  password: string;
}
export interface IState {
  authToken: string;
  id: string;
  name: string;
  pageLoaded: boolean;
}

export enum FormsData {
  name = 'name',
  email = 'email',
  password = 'password',
  signin = 'signin',
  signup = 'signup',
}

export type sign = 'signin' | 'signup';
