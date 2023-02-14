import { User } from '../data/types';

const getInactiveUsers = (users: User[], boardMembers: string[]) =>
  users.filter((el) => !boardMembers.includes(el._id));

export default getInactiveUsers;
