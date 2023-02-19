import state from '../state/state';
import { getAllBoards } from '../API/boards';
import { Board } from '../data/types';

const drawProjectsList = async () => {
  const allProjects: Board[] = await getAllBoards(state.authToken);
  const userProjects = allProjects.filter((el) => el.owner === state.id || el.users.includes(state.id));
  const projects = document.querySelector('.aside-projects');
  document.querySelector('.projects-container')?.remove();
  if (projects) {
    if (userProjects.length) {
      const projectsContainer = document.createElement('div');
      projectsContainer.classList.add('projects-container');
      userProjects.forEach((el) => {
        const { _id } = el;
        const board = document.createElement('a');
        board.classList.add('aside-item', 'aside-project');
        board.href = `#/projects/${_id}`;
        board.setAttribute('data-boardId', _id);
        board.textContent = el.title;
        projectsContainer.append(board);
      });
      projects.append(projectsContainer);
    }
  }
};

export default drawProjectsList;
