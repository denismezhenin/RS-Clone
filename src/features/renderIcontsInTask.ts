import getBoardIcons from '../pages/boards/getBoardIcons';

const renderIconsInTask = async () => {
  const memberInTask = document.querySelectorAll<HTMLDivElement>('.task-assignees__container');
  memberInTask.forEach(async (el) => {
    if (el.dataset.users) {
      const usersArray = el.dataset.users.length > 0 ? el.dataset.users?.split(',') : [];
      const taskId = el.closest<HTMLElement>('.task')?.id;
      if (usersArray.length > 0) {
        await getBoardIcons(usersArray, `[data-ID="${taskId}"]`);
      }
    }
  });
};
export default renderIconsInTask;
