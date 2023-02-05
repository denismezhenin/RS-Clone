import { BOARDS_URL } from '../constants/constants';

export const getAllBoards = async (token: string) => {
  const response = await fetch(BOARDS_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return result;
};

export const createBoard = async (
  token: string,
  body: {
    title: string;
    owner: string;
    users: string[];
  }
) =>
  (
    await fetch(BOARDS_URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
  ).json();

export const getBoardsById = async (token: string, id: string) => {
  const response = await fetch(`${BOARDS_URL}/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch();
  return response.status !== 200 ? false : { ...(await response.json()) };
};

export const updateBoard = async (
  token: string,
  id: string,
  body: {
    title: string;
    owner: string;
    users: [string];
  }
) =>
  (
    await fetch(`${BOARDS_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();

export const deleteBoard = async (token: string, id: string) =>
  (
    await fetch(`${BOARDS_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
