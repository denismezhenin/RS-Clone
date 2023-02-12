import state from '../../state/state';
import getAsideHtml from '../home/getAsideHtml';
import drawProjectsList from '../../features/drawProjectsList';
import getBoardId from '../../services/getBoardId';
import { User, Board, ITasks } from '../../data/types';
import { getUserById } from '../../API/users';
import getUserIcon from '../../services/getUserIcon';
import { getAllBoards } from '../../API/boards';
import { getTasksSetByUserId } from '../../API/tasks';
import UI from '../../data/UI';

const Member = {
  render: async () => `
      <div class="main_home">
        ${getAsideHtml()}
        <div class="main-member-card"></div>
      </div>
      `,
  after_render: async () => {
    if (state.authToken) {
      drawProjectsList();
    }

    const main = document.querySelector('.main-member-card');
    const memberId = getBoardId();

    const card = document.createElement('div');
    card.classList.add('member-info');

    const iconName = document.createElement('section');
    iconName.classList.add('icon-name');
    const user: User = await getUserById(state.authToken, memberId);
    const icon = getUserIcon(user.name);
    icon.classList.remove('user-icon');
    icon.classList.add('member-icon');

    const name = document.createElement('h5');
    name.classList.add('member-name');
    name.textContent = user.name;
    iconName.append(icon, name);

    const allBoards: Board[] = await getAllBoards(state.authToken);
    const userBoards = allBoards.filter((item) => item.users.includes(memberId));
    const tasks: ITasks[] = await getTasksSetByUserId(state.authToken, memberId);

    const info = document.createElement('section');
    info.classList.add('member-tasks-projects');

    const tasksBlock = document.createElement('div');
    const tasksHeader = document.createElement('h4');
    tasksHeader.classList.add('member-tasks-header');
    tasksHeader.textContent = UI.memberTasksHeader;
    const tasksList = document.createElement('ul');
    tasksList.classList.add('member-tasks-list');
    tasks.forEach((el) => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#/project/${el.boardId}`;
      link.textContent = `${el.title}`;
      link.classList.add('member-task-link');
      li.append(link);
      tasksList.append(li);
    });
    tasksBlock.append(tasksHeader, tasksList);

    const projectsBlock = document.createElement('div');
    const projectsHeader = document.createElement('h4');
    projectsHeader.classList.add('member-projects-header');
    projectsHeader.textContent = UI.memberProjectsHeader;
    const projectsList = document.createElement('ul');
    projectsList.classList.add('member-projects-list');
    userBoards.forEach((el) => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#/project/${el._id}`;
      link.textContent = `${el.title}`;
      link.classList.add('member-project-link');
      li.append(link);
      projectsList.append(li);
    });
    projectsBlock.append(projectsHeader, projectsList);

    info.append(tasksBlock, projectsBlock);
    card.append(iconName, info);
    main?.append(card);
  },
};

export default Member;