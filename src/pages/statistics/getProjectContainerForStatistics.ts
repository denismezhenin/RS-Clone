import { Board } from '../../data/types';

const statisticsOpen = (e: Event) => {
  if (!(e.target instanceof HTMLElement)) return;
  const { target } = e;
  const projectCard = <HTMLElement>target.closest('.project-card');
  if (projectCard) {
    const id = projectCard.id.split('-')[1];
    window.location.href = `#/statistics/${id}`;
  }
};

const getProjectsContainerForStatistics = async (projects: Board[]) => {
  const membersContainer = document.createElement('section');
  membersContainer.classList.add('project-cards');

  projects.forEach(async (el) => {
    const card = document.createElement('div');
    card.classList.add('project-card');
    card.id = `project-${el._id}`;

    const titleContainer = document.createElement('div');
    titleContainer.classList.add('project-title__container');

    const title = document.createElement('h5');
    title.classList.add('project-title');
    title.textContent = el.title.toUpperCase();

    const stats = document.createElement('div');
    stats.classList.add('stats-image__container');

    titleContainer.appendChild(title);
    stats.innerHTML = `<img class="stats-image" src="../../assets/icons/bar-chart-statistics.svg">`;
    card.append(titleContainer, stats);
    membersContainer.appendChild(card);

    card.addEventListener('click', statisticsOpen);
  });
  return membersContainer;
};
export default getProjectsContainerForStatistics;
