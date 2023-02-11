import { BOARDS_URL, COLUMNS_SET, DEFAULT_ERROR } from '../constants/constants';
import { ToastrType } from '../data/types';
import popUpMessages from '../features/popUpMessages/popupMessages';
import { removeSpinner, getSpinner } from '../features/spinner/spinner';

export const getColumnsInBoard = async (token: string, boardId: string) => {
  try {
    getSpinner();
    const response = await fetch(`${BOARDS_URL}/${boardId}/columns`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw { ...(await response.json()) }.message;
    }
    return await response.json();
  } catch (err) {
    popUpMessages(ToastrType.error, String(err));
  } finally {
    removeSpinner();
  }
};

export const createColumns = async (
  token: string,
  boardId: string,
  body: {
    title: string;
    order: 0;
  }
) => {
  try {
    getSpinner();
    const response = await fetch(`${BOARDS_URL}/${boardId}/columns`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status !== 200) {
      throw { ...(await response.json()) }.message;
    }
    return await response.json();
  } catch (err) {
    popUpMessages(ToastrType.error, String(err));
  } finally {
    removeSpinner();
  }
};

export const getColumnById = async (token: string, boardId: string, columnId: string) => {
  try {
    const response = await fetch(`${BOARDS_URL}/${boardId}/columns/${columnId}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status !== 200) {
      throw { ...(await response.json()) }.message;
    }
    return { ...(await response.json()) };
  } catch (err) {
    popUpMessages(ToastrType.error, String(err));
  }
};

export const updateColumnById = async (
  token: string,
  boardId: string,
  columnId: string,
  body: {
    title: string;
    order: number;
  }
) => {
  try {
    const response = await fetch(`${BOARDS_URL}/${boardId}/columns/${columnId}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status !== 200) {
      throw { ...(await response.json()) }.message;
    }
    await response.json();
  } catch (err) {
    popUpMessages(ToastrType.error, String(err) || DEFAULT_ERROR);
  }
};

export const deleteColumn = async (token: string, boardId: string, columnId: string) => {
  (
    await fetch(`${BOARDS_URL}/${boardId}/columns/${columnId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
};

export const updateSetOfColumns = async (
  token: string,
  body: {
    _id: string;
    order: number;
  }[]
) => {
  try {
    const response = await fetch(COLUMNS_SET, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status !== 200) {
      throw { ...(await response.json()) }.message;
    }
    await response.json();
  } catch (err) {
    popUpMessages(ToastrType.error, String(err) || DEFAULT_ERROR);
  }
};
