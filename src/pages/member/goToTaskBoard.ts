import state from '../../state/state';

const goToTaskBoard = (event: Event) => {
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

  if (target instanceof HTMLSpanElement) {
    const row = target.closest('.task-row');
    if (row) {
      const taskId = row.getAttribute('id');
      const boardId = row.getAttribute('data-board-id');
      if (taskId && boardId) {
        state.selectedTask = taskId;
        window.location.href = `#/projects/${boardId}#target`;
      }
    }
  }
};

export default goToTaskBoard;
