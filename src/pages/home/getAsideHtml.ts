import i18next from 'i18next';

const getAsideHtml = () =>
  `
    <aside class="aside">
      <section class="aside-nav">
        <a href="/#" class="aside-item aside-home aside-menu__item">${i18next.t('asideHome')}</a>
        <a href="/#/projects" class="aside-item aside-boards aside-menu__item">${i18next.t('asideProjects')}</a>
        <a href="/#/tasks" class="aside-item aside-tasks aside-menu__item">${i18next.t('asideTasks')}</a>
        <a href="/#/members" class="aside-item aside-members aside-menu__item">${i18next.t('asideMembers')}</a>
        <a href="/#/statistics" class="aside-item aside-stats aside-menu__item">${i18next.t('asideStats')}</a>
        <a href="/#/settings" class="aside-item aside-settings aside-menu__item">${i18next.t('asideSettings')}</a>
      </section>
    </aside>
  `;

export default getAsideHtml;
