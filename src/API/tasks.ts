import { BOARDS_URL, DEFAULT_ERROR, TASKS_SET } from '../constants/constants';
import { ToastrType } from '../data/types';
import popUpMessages from '../features/popUpMessages/popupMessages';

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
    popUpMessages(ToastrType.error, String(err) || DEFAULT_ERROR);
  }
};

export const getTaskById = async (token: string, boardId: string, columnId: string, taskId: string) => {
  try {
    const response = await fetch(`${BOARDS_URL}/${boardId}/columns/${columnId}/tasks/${taskId}`, {
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
    popUpMessages(ToastrType.error, String(err) || DEFAULT_ERROR);
  }
};

export const updateSetOfTasks = async (
  token: string,
  body: {
    _id: string;
    order: number;
    columnId: string;
  }[]
) => {
  try {
    const response = await fetch(TASKS_SET, {
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
