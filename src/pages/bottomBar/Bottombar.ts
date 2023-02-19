import getBottomBarHtml from './BottomBarPage';
import setPreferences from '../../features/settings/setPreferences';

const Bottombar = {
  render: async () => {
    const view = getBottomBarHtml();
    return view;
  },
  after_render: async () => {
    setPreferences();
  },
};

export default Bottombar;
