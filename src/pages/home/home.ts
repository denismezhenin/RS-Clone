import getHomeHtml from './getHomeHtml';
import { loginHTML } from '../login/loginHTML'

const Home = {
  render: async () => {
    const view = loginHTML('signin')
    // getHomeHtml();
    return view;
  },
  after_render: async () => {},
};

export default Home;
