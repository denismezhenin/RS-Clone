import { SIGN_UP_URL, signInURL, usersURL } from '../constants/constants';

export const signUp = async (body: {
  name: string;
  login: string;
  password: string;
}) => {
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
    const response = await fetch(signInURL, {
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

export const getUsers = async (token: string) => {
  const response = await fetch(usersURL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return result;
};

export const getUserById = async (token: string, id: string) => {
  const response = await fetch(`${usersURL}/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return result;
};

export const updateUser = async (
  token: string,
  id: string,
  body: { name: string; login: string; password: string }
) =>
  (
    await fetch(`${usersURL}/${id}`, {
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
    await fetch(`${usersURL}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
