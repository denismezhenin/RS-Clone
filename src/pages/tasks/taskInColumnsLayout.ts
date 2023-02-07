import { ITasks } from '../../data/types';

const getTaskHTML = (tasks: ITasks[]) =>
  `
   ${tasks
     .sort((a, b) => a.order - b.order)
     .map(
       (task: ITasks) => `
 <li class="task" id='${task._id}'>
<div class="task-wrapper">
<div class="task-header">
  <h3 class="task-title">${task.title}</h3>
  ...
</div>
<div class="task-body">
  <div class="task-pop-up__menu hide">
    <ul class="task-menu__list">
      <li class="task-menu__item">Rename</li>
      <li class="task-menu__item">Delete</li>
    </ul>
  </div>
  <div class="task-description">${task.description}</div>
  <div class="task-footer">
    <h4 class="task-assignees__text">Assignees:</h4>
    <div class="task-assignees__container"></div>
  </div>
</div>
</div>
</li> 
 `
     )
     .join('')}
`;

export default getTaskHTML;
