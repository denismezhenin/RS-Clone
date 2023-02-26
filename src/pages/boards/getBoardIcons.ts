import { getUserById } from '../../API/users';
import getUserIcon from '../../services/getUserIcon';
import state from '../../state/state';

const getBoardIcons = async (userIds: string[], selector: string, maxVisibleMembers: number) => {
  const ABSOLUTE_POSITION_IN_REMS = 2.3;
  const memberIcons = document.querySelector(selector);

  if (memberIcons && userIds.length > 0) {
    const zIndex = userIds.length;
    const right = '0';
    const limit = userIds.length <= maxVisibleMembers ? userIds.length : maxVisibleMembers;
    userIds.forEach(async (el, i) => {
      if (i < limit) {
        const user = await getUserById(state.authToken, el);
        const icon = getUserIcon(user.name, user._id);
        memberIcons.append(icon);
        icon.style.right = `${Number(right) + i * ABSOLUTE_POSITION_IN_REMS}rem`;
        icon.style.zIndex = (zIndex - i).toString();
      }
    });

    if (userIds.length > maxVisibleMembers) {
      const rest = document.createElement('div');
      rest.classList.add('rest-icon');
      rest.textContent = `+${userIds.length - maxVisibleMembers + 1}`;
      memberIcons.append(rest);
    }
  }
};

export default getBoardIcons;
