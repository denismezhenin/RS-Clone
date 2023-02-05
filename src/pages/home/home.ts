import getHomeHtml from './getHomeHtml';
import taskForm from '../taskForm/taskHTML';
import { tsQuerySelector } from '../../helpers/helpers';

const Home = {
  render: async () => {
    const view = getHomeHtml();
    return view;
  },
  after_render: async () => {
   
  },
};

export default Home;
