import { tsQuerySelector, tsQuerySelectorAll } from '../../helpers/helpers';
import state from '../../state/state';

export const checkHideAside = () => {
  const hideAsideButton = tsQuerySelector(document, '.hide-aside__button');
  const asideMenuItem = <HTMLElement[]>[...tsQuerySelectorAll(document, '.aside-menu__item')];
  const asideNav = tsQuerySelector(document, '.aside-nav');
  const logoHeader = tsQuerySelector(document, '.logo-header');
  const logo = tsQuerySelector(document, '.logo');

  if (!state.hideAside) {
    hideAsideButton.style.transform = 'rotateY(180deg)';
    asideMenuItem.forEach((el) => {
      el.style.cssText = `
  font-size: 0;
  padding: 
  0;
  width: 10rem;
  `;
    });
    asideNav.style.width = '8rem';
    logoHeader.style.fontSize = '0';
    logo.style.cssText = `
  width: 6.2rem;
  margin-left: 20px;
  `;

    asideMenuItem.forEach((el) => {
      if (el instanceof HTMLAnchorElement) {
        el.classList.add('aside-item_hidden');
      }
    });
  }

  if (state.hideAside) {
    hideAsideButton.style.transform = 'rotateY(0)';
    asideMenuItem.forEach((el) => {
      el.style.cssText = `
  font-size: 1.7rem;
  padding-left: 4rem;
  width: '';
  `;
    });
    asideNav.style.width = '22.1rem';
    logoHeader.style.fontSize = '2rem';
    logo.style.cssText = `
  width: 22.3rem;
  margin-left: 0;
  `;

    asideMenuItem.forEach((el) => {
      if (el instanceof HTMLAnchorElement) {
        el.classList.remove('aside-item_hidden');
      }
    });
  }
};

export const hideAside = () => {
  state.hideAside = !state.hideAside;
  checkHideAside();
};
