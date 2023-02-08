import { BOARDS_URL, TASKS_SET } from '../constants/constants';
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
    popUpMessages('error', err as string);
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
    popUpMessages('error', err as string);
  }
};

export const updateSetOfTasks = async (
  token: string,
  body: 
    {
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
    popUpMessages('error', err as string);
  }
};
