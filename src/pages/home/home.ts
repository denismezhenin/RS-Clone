import getHomeHtml from './getHomeHtml';

const Home = {
  render: async () => {
    const view = getHomeHtml();
    return view;
  },
  after_render: async () => {},
};

export default Home;
