import { rgbToHex, tsQuerySelector } from '../../helpers/helpers';

const editTask = (target: HTMLElement) => {
  const form = tsQuerySelector(document, '.new-card');
  const title = tsQuerySelector<HTMLInputElement>(form, '#title');
  const color = tsQuerySelector<HTMLInputElement>(form, '#color');
  const description = tsQuerySelector<HTMLTextAreaElement>(form, '#description');
  const duration = tsQuerySelector<HTMLSelectElement>(form, '#duration');
  const task = target.closest<HTMLElement>('.task');
  if (!task) return;
  const taskDescription = tsQuerySelector(task, '.task-description');
  const taskDuration = tsQuerySelector(task, '.task-time__duration');
  const taskPriority = tsQuerySelector(task, '.task-priority');
  const taskTitle = tsQuerySelector(task, '.task-title');
  if (!taskDescription.textContent || !taskDuration.textContent || !taskPriority.textContent || !taskTitle.textContent)
    return;
  const priority = tsQuerySelector<HTMLInputElement>(form, `#priority-${taskPriority.textContent.toLocaleLowerCase()}`);
  title.value = taskTitle.textContent;
  description.value = taskDescription.textContent;
  duration.value = taskDuration.textContent.toLowerCase();
  priority.checked = true;
  color.value = rgbToHex(taskDescription.style.color);
};

export default editTask;
