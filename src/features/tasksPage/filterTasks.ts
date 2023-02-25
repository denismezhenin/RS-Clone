const filterTasks = (event: Event) => {
  const searchInput = <HTMLInputElement>document.querySelector('.search-input');
  searchInput.value = '';
  const taskStatuses = document.querySelectorAll('.status-ceil');

  const { target } = event;
  if (target instanceof HTMLInputElement) {
    taskStatuses.forEach((el) => {
      const text = el.textContent;
      const row = <HTMLDivElement>el.closest('.task-row');

      if (target.classList.contains('todo') && text !== 'Todo' && text !== 'Выполнить') {
        row.style.display = 'none';
      } else if (target.classList.contains('in-progress') && text !== 'In progress' && text !== 'В работе') {
        row.style.display = 'none';
      } else if (target.classList.contains('done') && text !== 'Done' && text !== 'Выполнено') {
        row.style.display = 'none';
      } else {
        row.style.display = 'grid';
      }
    });
  }
};
export default filterTasks;
