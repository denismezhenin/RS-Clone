import i18next from 'i18next';

const changeVisibleElements = () => {
  const asideHome = <HTMLAnchorElement>document.querySelector('.aside-home');
  asideHome.textContent = i18next.t('asideHome');

  const asideBoards = <HTMLAnchorElement>document.querySelector('.aside-boards');
  asideBoards.textContent = i18next.t('asideProjects');

  const asideTasks = <HTMLAnchorElement>document.querySelector('.aside-tasks');
  asideTasks.textContent = i18next.t('asideTasks');

  const asideMembers = <HTMLAnchorElement>document.querySelector('.aside-members');
  asideMembers.textContent = i18next.t('asideMembers');

  const asideStats = <HTMLAnchorElement>document.querySelector('.aside-stats');
  asideStats.textContent = i18next.t('asideStats');

  const asideSettings = <HTMLAnchorElement>document.querySelector('.aside-settings');
  asideSettings.textContent = i18next.t('asideSettings');

  const chooseTheme = <HTMLHeadingElement>(
    document.querySelector('.settings-header_theme')
  );
  chooseTheme.textContent = i18next.t('chooseTheme');

  const chooseLang = <HTMLHeadingElement>document.querySelector('.settings-header_language');
  chooseLang.textContent = i18next.t('chooseLanguage');
};

export default changeVisibleElements;
