import getHomeHtml from './getHomeHtml';
import { tsQuerySelector } from '../../helpers/helpers';
import getColumnHTML from '../columns/columnsHtml';
import { signIn } from '../../API/users';

const Home = {
  render: async () => {
    const view = getHomeHtml();
    return view;
  },
  after_render: async () => {
    const user = {
      login: 'IMask',
      password: 'Tesla4ever',
    };
    const { token } = await signIn(user);
    console.log(token);
    const mainInfo = tsQuerySelector(document, '.main-info');

    mainInfo.innerHTML = await getColumnHTML(token, '63de6774263179e9ac7de909');
  },
};

export default Home;
