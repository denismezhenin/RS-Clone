import UI from '../../data/UI';

const getAsideHtml = () =>
  `
    <aside class="aside">
      <section class="aside-nav">
        <a href="/#" class="aside-item aside-home aside-menu__item">${UI.asideHome}</a>
        <a href="/#/messages" class="aside-item aside-messages aside-menu__item">${UI.asideMessages}</a>
        <a href="/#/tasks" class="aside-item aside-tasks aside-menu__item">${UI.asideTasks}</a>
        <a href="/#/members" class="aside-item aside-members aside-menu__item">${UI.asideMembers}</a>
        <a href="/#/settings" class="aside-item aside-settings aside-menu__item">${UI.asideSettings}</a>
      </section>
      <section class="aside-projects">
        <h3 class="aside-projects_header">${UI.asideHeader}</h3>
        <button class="plus-board" data-tooltip="Create new project"></button>
      </section>
    </aside>
  `;

export default getAsideHtml;
