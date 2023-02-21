import { User } from '../data/types';

const getActiveUsers = (users: User[], boardMembers: string[]) =>
  users.filter((el) => boardMembers.includes(el._id));

export default getActiveUsers;
