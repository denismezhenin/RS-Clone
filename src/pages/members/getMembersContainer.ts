import state from '../../state/state';
import MEMBERS_ON_PAGE from '../../constants/membersOnPage';
import { User, Board } from '../../data/types';
import { getUserById } from '../../API/users';
import getUserIcon from '../../services/getUserIcon';
import { getAllBoards } from '../../API/boards';
import { getTasksSetByUserId } from '../../API/tasks';

const getMembersContainer = async () => {
  const membersContainer = document.createElement('section');
  membersContainer.classList.add('member-cards');

  state.members
    .slice((state.membersPage - 1) * MEMBERS_ON_PAGE, state.membersPage * MEMBERS_ON_PAGE)
    .forEach(async (el) => {
      const card = document.createElement('a');
      card.classList.add('member-card');
      card.href = `#/members/${el}`;
      const user: User = await getUserById(state.authToken, el);
      const icon = getUserIcon(user.name, user._id);
      icon.classList.remove('user-icon');
      icon.classList.add('member-icon');

      const name = document.createElement('h5');
      name.classList.add('member-name');
      name.textContent = user.name;

      const allBoards: Board[] = await getAllBoards(state.authToken);
      const userBoards = allBoards.filter((item) => item.users.includes(el));
      const tasks = await getTasksSetByUserId(state.authToken, el);
      const stats = document.createElement('p');
      stats.classList.add('member-stats');
      stats.textContent = `TASKS / PROJECTS: ${tasks.length} / ${userBoards.length}`;

      card.append(icon, name, stats);
      membersContainer.appendChild(card);
    });

  return membersContainer;
};

export default getMembersContainer;
