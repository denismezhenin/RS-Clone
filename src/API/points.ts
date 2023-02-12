import { POINTS, DEFAULT_ERROR } from '../constants/constants';
import { ToastrType } from '../data/types';
import popUpMessages from '../features/popUpMessages/popupMessages';
import { getSpinner, removeSpinner } from '../features/spinner/spinner';

export const createPoint = async (
  token: string,
  body: {
    title: string;
    taskId: string;
    boardId: string;
    done: Boolean;
    startDate: string;
    endDate: string;
  }
) => {
  try {
    getSpinner();
    const response = await fetch(`${POINTS}`, {
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
    popUpMessages(ToastrType.error, String(err) || DEFAULT_ERROR);
  } finally {
    removeSpinner();
  }
};

export const getPointsByTaskId = async (token: string, taskId: string) => {
  try {
    const response = await fetch(`${POINTS}/${taskId}`, {
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

export const updatePoints = async (
  token: string,
  pointId: string,
  body: { title: string; done: Boolean; startDate: string; endDate: string }
) => {
  try {
    const response = await fetch(`${POINTS}/${pointId}`, {
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
