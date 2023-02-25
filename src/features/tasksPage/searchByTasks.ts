const searchByTasks = (event: Event) => {
  const allStatusesCheckbox = <HTMLInputElement>document.querySelector('.all-statuses');
  allStatusesCheckbox.checked = true;

  const taskTitles = document.querySelectorAll('.title-ceil');
  if (event.target && event.target instanceof HTMLInputElement) {
    const { target } = event;
    const value = target.value.trim();

    taskTitles.forEach((el) => {
      if (el instanceof HTMLSpanElement) {
        const row = <HTMLDivElement>el.closest('.task-row');
        if (!el.textContent?.includes(value) && value !== '') {
          row.style.display = 'none';
        } else {
          row.style.display = 'grid';
        }
      }
    });
  }
};

export default searchByTasks;
