import { BOARDS_URL } from '../constants/constants';

export const getColumnsInBoard = async (token: string, boardId: string) => {
  try {
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
    return console.log(err);
  }
};

export const createColumns = async (
  token: string,
  boardId: string,
  body: {
    title: 'string';
    order: 0;
  }
) => {
  try {
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
    return console.log(err);
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
    return console.log(err);
  }
};

export const updateColumnById = async (
  token: string,
  boardId: string,
  columnId: string,
  body: {
    title: 'string';
    order: 0;
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
    console.log(err);
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
