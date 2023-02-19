import { ITasks } from '../../data/types';
import getBoardIcons from '../boards/getBoardIcons';

const IsJsonString = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return JSON.parse(str);
};

const getTaskHTML = (tasks: ITasks[]) =>
  `
 ${tasks
   .sort((a, b) => a.order - b.order)
   .map((task: ITasks) => {
     const description = IsJsonString(task.description);
    //  const id = `#${task._id}`;
     return `
      <li class="task" id="${task._id}">
     <div class="task-wrapper">
     <span class="task-priority task-priority__${description ? description.priority : ''}" style="display:none">${
       description ? description.priority : ''
     }</span>
     <div class="task-header">
       <h3 class="task-title">${task.title}</h3>
       <div class="task-pop-up__menu">...
     </div>
     <ul class="task-menu__list hide">
     <li class="task-menu__item edit-task">Edit</li>
     <li class="task-menu__item delete-task">Delete</li>
   </ul>
     </div>
     <div class="task-body">
       <div class="task-description" style="color:${description ? description.color : ''}">${
       description ? description.description : task.description
     }</div>
       <div class="task-footer">
       <div class="task-assignees">
       <h4 class="task-assignees__text">Assignees:</h4>
       <div class="task-assignees__container" data-users="${task.users}" data-ID="${task._id}">
       </div>
       </div>
         <div class="task-time">
         <span class="task-time__description">Duration: </span>
         <span class="task-time__start">${description ? description.duration : ''}</span>
         </div>
       </div>
     </div>
     </div>
     </li> 
      `;
   })
   .join('')}
`;

export default getTaskHTML;
