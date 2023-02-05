import { sliceNumber } from '../../constants/constants';
import { FormsData } from '../../data/types';
import userForm from './login';
import loginHTML from './loginHTML';

const LogIn = {
  render: async () => {
    const page = window.location.href.slice(sliceNumber);
    if (page === FormsData.signin || page === FormsData.signup) {
      const view = loginHTML(page);
      return view;
    }
    return '';
  },
  after_render: async () => {
    userForm();
  },
};

export default LogIn;
