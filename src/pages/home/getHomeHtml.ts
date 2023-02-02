import UI from '../../data/UI';

const getHomeHtml = () =>
  `
  <div class="main_home">
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
        <img src="../assets/icons/plus.svg" class="plus-img">
        <a href="" class="aside-item aside-project">First project</a>
      </section>
    </aside>
    <div class="main-info">
      <h2 class="main-info_header">About the project</h2>
      <p>
        Task manager is a collaborative work management app designed to track team projects, highlight tasks underway, show who they are assigned to, and detail progress towards completion.
        <br>
        At its core, task manager relies on the principles of Kanban project boards to visualize workflows, providing managers and team members with a simple overview of a project from start to finish.
      </p>
    </div>
  </div>
  `;

export default getHomeHtml;
