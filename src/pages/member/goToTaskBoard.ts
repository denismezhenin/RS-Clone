import state from '../../state/state';

const goToTaskBoard = (event: MouseEvent) => {
  const { target } = event;
  if (
    target instanceof HTMLParagraphElement &&
    target.classList.contains('member-task-link') &&
    target.getAttribute('id')
  ) {
    const taskId = target.getAttribute('id');
    const boardId = target.getAttribute('data-board-id');
    if (taskId && boardId) {
      state.selectedTask = taskId;
      window.location.href = `#/projects/${boardId}#target`;
    }
  }
};

export default goToTaskBoard;
