import { BOARDS_URL } from '../constants/constants';

const getTasksInColumn = async (token: string, boardId: string, columnId: string) => {
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
    console.log(err);
  }
  return null;
};
export default getTasksInColumn;
