import i18next from 'i18next';
import getAsideHtml from './getAsideHtml';
import state from '../../state/state';
import listen from '../../features/listen';
import { getUsers } from '../../API/users';
import createTooltip from '../../features/createTooltip';

const Home = {
  render: async () => {
    if (!(await getUsers(state.authToken))[0]) {
      window.location.href = '#/signin';
    }
    const view = `
    <div class="main_home">
      ${getAsideHtml()}
      <div class="main-info">
        <h2 class="main-info_header">${i18next.t('homeHeader')}</h2>
        <p>
        ${i18next.t('homeText1')}
          <br>
          ${i18next.t('homeText2')}
        </p>
      </div>
    </div>
    `;
    return view;
  },
  after_render: async () => {
    document.body.classList.add('body_home');

    if (state.authToken) {
      window.addEventListener('click', listen);

      document.addEventListener('mouseover', createTooltip);
      document.addEventListener('mouseout', () => document.querySelector('.tooltip-block')?.remove());
    }
  },
};

export default Home;
