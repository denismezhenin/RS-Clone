import UI from '../../data/UI';

const getAsideHtml = () =>
  `
    <aside class="aside">
      <section class="aside-nav">
        <a href="/#" class="aside-item aside-home aside-menu__item">${UI.asideHome}</a>
        <a href="/#/projects" class="aside-item aside-boards aside-menu__item">${UI.asideProjects}</a>
        <a href="/#/tasks" class="aside-item aside-tasks aside-menu__item">${UI.asideTasks}</a>
        <a href="/#/members" class="aside-item aside-members aside-menu__item">${UI.asideMembers}</a>
        <a href="/#/settings" class="aside-item aside-settings aside-menu__item">${UI.asideSettings}</a>
      </section>
    </aside>
  `;

export default getAsideHtml;
