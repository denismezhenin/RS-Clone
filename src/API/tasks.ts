import { BOARDS_URL, DEFAULT_ERROR, TASKS_SET } from '../constants/constants';
import { ToastrType } from '../data/types';
import getRedirect from '../features/getRedirect';
import popUpMessages from '../features/popUpMessages/popupMessages';
import { removeSpinner, getSpinner } from '../features/spinner/spinner';

export const getTasksInColumn = async (token: string, boardId: string, columnId: string) => {
  try {
    getSpinner();
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
    getRedirect(String(err));
    popUpMessages(ToastrType.error, String(err) || DEFAULT_ERROR);
    return true;
  } finally {
    removeSpinner();
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
    getRedirect(String(err));
    popUpMessages(ToastrType.error, String(err) || DEFAULT_ERROR);
    return true;
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
    getSpinner();
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
    getRedirect(String(err));
    popUpMessages(ToastrType.error, String(err) || DEFAULT_ERROR);
  } finally {
    removeSpinner();
  }
};

export const getTasksSetByUserId = async (token: string, userId: string) => {
  try {
    const response = await fetch(`${TASKS_SET}/${userId}`, {
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
    getRedirect(String(err));
    popUpMessages(ToastrType.error, String(err) || DEFAULT_ERROR);
    return true;
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
    getSpinner();
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
    getRedirect(String(err));
    popUpMessages(ToastrType.error, String(err) || DEFAULT_ERROR);
    return true;
  } finally {
    removeSpinner();
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
    getSpinner();
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
    getRedirect(String(err));
    popUpMessages(ToastrType.error, String(err) || DEFAULT_ERROR);
    return true;
  } finally {
    removeSpinner();
  }
};

export const deleteTask = async (token: string, boardId: string, columnId: string, taskID: string) => {
  try {
    const response = await fetch(`${BOARDS_URL}/${boardId}/columns/${columnId}/tasks/${taskID}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) {
      throw { ...(await response.json()) }.message;
    }
    return await response.json();
  } catch (err) {
    getRedirect(String(err));
    popUpMessages(ToastrType.error, String(err) || DEFAULT_ERROR);
    return true;
  }
};

export const getTasksSetByBoardId = async (token: string, boardId: string) => {
  try {
    const response = await fetch(`${TASKS_SET}/${boardId}`, {
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
    return true;
  }
};
