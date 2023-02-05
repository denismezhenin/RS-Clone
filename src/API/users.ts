import { SIGN_UP_URL, SIGN_IN_URL, USERS_URL } from '../constants/constants';
import state from '../state/state';

export const signUp = async (body: { name: string; login: string; password: string }) => {
  try {
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
    return console.log(err);
  }
};

export const signIn = async (body: { login: string; password: string }) => {
  try {
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
    const result = await response.json();
    state.id = result.id;
    state.authToken = result.token;
    return result;
  } catch (err) {
    return console.log(err);
  }
};

export const getUsers = async (token: string) => {
  const response = await fetch(USERS_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return result;
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
    return console.log(err);
  }
};

export const updateUser = async (token: string, id: string, body: { name: string; login: string; password: string }) =>
  (
    await fetch(`${USERS_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();

export const deleteUser = async (token: string, id: string) =>
  (
    await fetch(`${USERS_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
