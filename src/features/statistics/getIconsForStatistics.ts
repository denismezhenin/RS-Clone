import { getUserById } from '../../API/users';
import state from '../../state/state';
import getUserIcon from '../../services/getUserIcon';
import getUserStatisticsBar from './usersStatistics';
import { IColumns } from '../../data/types';

const getIcons = async (
  userIds: string[],
  selector: string,
  maxVisibleMembers: number,
  boardId: string,
  todo: IColumns,
  inProgress: IColumns,
  done: IColumns
) => {
  const memberIcons = document.querySelector(selector);

  if (memberIcons && userIds.length > 0) {
    const limit = userIds.length <= maxVisibleMembers ? userIds.length : maxVisibleMembers;
    userIds.forEach(async (el, i) => {
      if (i < limit) {
        const user = await getUserById(state.authToken, el);
        const icon = getUserIcon(user.name, user._id);
        memberIcons.append(icon);
        icon.style.position = `relative`;
        icon.style.width = '45px';
        icon.style.height = '45px';
        icon.style.cursor = 'pointer';
        icon.style.transition = '0.3s';
        icon.onmouseover = () => {
          icon.style.transform = 'scale(1.3)';
        };
        icon.onmouseleave = () => {
          icon.style.transform = '';
        };
        icon.addEventListener('click', (e) => getUserStatisticsBar(e, boardId, todo, inProgress, done, user.name));
      }
    });
  }
};
export default getIcons;
