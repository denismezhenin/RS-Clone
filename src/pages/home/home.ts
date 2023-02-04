import getHomeHtml from './getHomeHtml';
import { loginHTML } from '../login/loginHTML';

const Home = {
  render: async () => {
    const view = loginHTML('signup')
    // getHomeHtml();
    return view;
  },
  after_render: async () => {
    document.addEventListener('click', (e) => {
      if (!(e.target instanceof HTMLElement)) return;
      const { target } = e;
      if (target.classList.contains('sign-in')) {
      }
    });
  },
};

export default Home;
