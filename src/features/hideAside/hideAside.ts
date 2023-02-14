/* eslint-disable no-return-assign */
import { tsQuerySelector, tsQuerySelectorAll } from '../../helpers/helpers';
import state from '../../state/state';

const hideAside = () => {
  const hideAsideButton = tsQuerySelector(document, '.hide-aside__button');
  const asideMenuItem = tsQuerySelectorAll(document, '.aside-menu__item') as unknown as HTMLElement[];
  const asideNav = tsQuerySelector(document, '.aside-nav');
  const logoHeader = tsQuerySelector(document, '.logo-header');
  const logo = tsQuerySelector(document, '.logo');
  const asideProjects = tsQuerySelector(document, '.aside-projects');

  if (!state.hideAside) {
    hideAsideButton.style.transform = 'rotateY(180deg)';
    asideMenuItem.forEach(
      (el) =>
        (el.style.cssText = `
  font-size: 0;
  padding: 
  0;
  width: 10rem;
  `)
    );
    asideNav.style.width = '8rem';
    logoHeader.style.fontSize = '0';
    logo.style.cssText = `
  width: 6.2rem;
  margin-left: 20px;
  `;
    asideProjects.style.display = 'none';
  }

  if (state.hideAside) {
    hideAsideButton.style.transform = 'rotateY(0)';
    asideMenuItem.forEach(
      (el) =>
        (el.style.cssText = `
  font-size: 2rem;
  padding-left: 4rem;
  width: '';
  `)
    );
    asideNav.style.width = '22.1rem';
    logoHeader.style.fontSize = '2rem';
    logo.style.cssText = `
  width: 22.3rem;
  margin-left: 0;
  `;
    asideProjects.style.display = 'block';
  }
  state.hideAside = !state.hideAside;
};
export default hideAside;
