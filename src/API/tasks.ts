import { BOARDS_URL } from '../constants/constants';

export const getTasksInColumn = async (token: string, boardId: string, columnId: string) => {
  try {
    const response = await fetch(`${BOARDS_URL}/${boardId}/columns/${columnId}/tasks`, {
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

export const createTask = async (
  token: string,
  boardId: string,
  columnId: string,
  body: {
    title: string;
    order: 0;
    description: string;
    userId: string;
    users: Array<string>;
  }
) => {
  try {
    const response = await fetch(`${BOARDS_URL}/${boardId}/columns/${columnId}/tasks`, {
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

export const updateTask = async (
  token: string,
  boardId: string,
  columnId: string,
  taskID: string,
  body: {
    title: string;
    order: 0;
    description: string;
    userId: string;
    users: Array<string>;
  }
) => {
  try {
    const response = await fetch(`${BOARDS_URL}/${boardId}/columns/${columnId}/tasks/${taskID}`, {
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
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const deleteTask = async (token: string, boardId: string, columnId: string, taskID: string) => {
  try {
    const response = await fetch(`${BOARDS_URL}/${boardId}/columns/${columnId}/tasks/${taskID}`, {
      method: 'DELETE',
    });

    if (response.status !== 200) {
      throw { ...(await response.json()) }.message;
    }
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};
