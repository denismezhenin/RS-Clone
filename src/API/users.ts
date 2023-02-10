import { SIGN_UP_URL, SIGN_IN_URL, USERS_URL, DEFAULT_ERROR } from '../constants/constants';
import popUpMessages from '../features/popUpMessages/popupMessages';
import { ToastrType } from '../data/types';
import { getSpinner, removeSpinner } from '../features/spinner/spinner';


export const signUp = async (body: { name: string; login: string; password: string }) => {
  try {
    getSpinner();
    const response = await fetch(SIGN_UP_URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
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

export const signIn = async (body: { login: string; password: string }) => {
  try {
    getSpinner();
    const response = await fetch(SIGN_IN_URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
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

export const getUsers = async (token: string) => {
  try {
    getSpinner();
    const response = await fetch(USERS_URL, {
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

export const getUserById = async (token: string, id: string) => {
  try {
    const response = await fetch(`${USERS_URL}/${id}`, {
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
  }
};

export const updateUser = async (
  token: string,
  id: string,
  body: { name: string; login: string; password: string }
) => {
  try {
    getSpinner();
    const response = await fetch(`${USERS_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) {
      throw { ...(await response.json()) }.message;
    }
    await response.json();
  } catch (err) {
    popUpMessages(ToastrType.error, String(err) || DEFAULT_ERROR);
  } finally {
    removeSpinner();
  }
};

export const deleteUser = async (token: string, id: string) =>
  (
    await fetch(`${USERS_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
