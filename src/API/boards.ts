import { BOARDS_URL, DEFAULT_ERROR } from '../constants/constants';
import { Board, ToastrType } from '../data/types';
import state from '../state/state';
import popUpMessages from '../features/popUpMessages/popupMessages';
import { getSpinner, removeSpinner } from '../features/spinner/spinner';

export const getAllBoards = async (token: string) => {
  try {
    getSpinner();
    const response = await fetch(BOARDS_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) {
      throw { ...(await response.json()) }.message;
    }

    return await response.json();
  } catch (err) {
    popUpMessages(ToastrType.error, String(err) || DEFAULT_ERROR);
  } finally {
    removeSpinner();
  }
};

export const createBoard = async (
  token: string,
  body: {
    title: string;
    owner: string;
    users: string[];
  }
) => {
  try {
    getSpinner();
    const response: Promise<Board> = (
      await fetch(BOARDS_URL, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      })
    ).json();
    const { _id } = await response;
    state.boardId = _id;
    return response;
  } finally {
    removeSpinner();
  }
};

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
    users: string[];
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
