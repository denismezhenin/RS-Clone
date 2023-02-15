import UI from '../../data/UI';

const getAsideHtml = () =>
  `
    <aside class="aside">
      <section class="aside-nav">
        <a href="/#" class="aside-item aside-home">${UI.asideHome}</a>
        <a href="/#/projects" class="aside-item aside-boards">${UI.asideProjects}</a>
        <a href="/#/tasks" class="aside-item aside-tasks">${UI.asideTasks}</a>
        <a href="/#/members" class="aside-item aside-members">${UI.asideMembers}</a>
        <a href="/#/settings" class="aside-item aside-settings">${UI.asideSettings}</a>
      </section>
    </aside>
  `;

export default getAsideHtml;
