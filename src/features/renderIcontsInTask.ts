import getBoardIcons from '../pages/boards/getBoardIcons';

const renderIconsInTask = async () => {
  const memberInTask = document.querySelectorAll<HTMLDivElement>('.task-assignees__container');
  memberInTask.forEach(async (el) => {
    const usersArray = el.dataset.users?.split(',');
    const taskId = el.closest<HTMLElement>('.task')?.id;
    if (usersArray) {
      await getBoardIcons(usersArray, `[data-ID="${taskId}"]`);
    }
  });
};
export default renderIconsInTask;
