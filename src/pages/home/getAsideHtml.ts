import UI from '../../data/UI';

const getAsideHtml = () =>
  `
    <aside class="aside">
      <section class="aside-nav">
        <a href="" class="aside-item aside-home">${UI.asideHome}</a>
        <a href="" class="aside-item aside-messages">${UI.asideMessages}</a>
        <a href="" class="aside-item aside-tasks">${UI.asideTasks}</a>
        <a href="" class="aside-item aside-members">${UI.asideMembers}</a>
        <a href="" class="aside-item aside-settings">${UI.asideSettings}</a>
      </section>
      <section class="aside-projects">
        <h3 class="aside-projects_header">${UI.asideHeader}</h3>
        <button class="plus-board"></button>
      </section>
    </aside>
  `;

export default getAsideHtml;
