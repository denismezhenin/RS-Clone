import getNavBarHtml from './getNavBarHtml';
import state from '../../state/state';
import drawLoggedInUser from './drawLoggedInUser';

const Navbar = {
  render: async () => {
    const view = getNavBarHtml();
    return view;
  },
  after_render: async () => {
    if (state.authToken) {
      drawLoggedInUser(state.id, state.name);
    }
  },
};

export default Navbar;
