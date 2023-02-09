import './styles/style.scss';

import Navbar from './pages/navBar/Navbar';
import Bottombar from './pages/bottomBar/Bottombar';
import LogIn from './pages/login/loginPage';
import Utils from './services/Utils';
import { tsQuerySelector } from './helpers/helpers';
import Boards from './pages/boards/boards';
import Home from './pages/home/home';
import Error404 from './pages/error404/error404';

const routes: { [key: string]: typeof Home | typeof Boards } = {
  '/': Home,
  '/project/:id': Boards,
  '/signin': LogIn,
  '/signup': LogIn,
};

const router = async () => {
  const header = tsQuerySelector(document, '#header_container');
  const content = tsQuerySelector(document, '#page_container');
  const footer = tsQuerySelector(document, '#footer_container');

  const request = Utils.parseRequestURL();

  const parsedURL =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');

  header.innerHTML = await Navbar.render();
  await Navbar.after_render();
  footer.innerHTML = await Bottombar.render();
  await Bottombar.after_render();

  const page = routes[parsedURL] ? routes[parsedURL] : Error404;
  content.innerHTML = await page.render();
  await page.after_render();
};

window.addEventListener('hashchange', router);

window.addEventListener('load', router);
