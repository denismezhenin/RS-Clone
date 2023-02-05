import getNavBarHtml from './getNavBarHtml';

const Navbar = {
  render: async () => {
    const view = getNavBarHtml();
    return view;
  },
  after_render: async () => {
  },
};

export default Navbar;
