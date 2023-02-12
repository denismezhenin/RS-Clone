import { ITasks } from '../../data/types';

const getTaskHTML = (tasks: ITasks[]) =>
  `
 ${tasks.sort((a, b) => a.order - b.order)
   .map(
     (task: ITasks) =>  {
       let description = IsJsonString(task.description); 
      return `
      <li class="task" id="${task._id}">
     <div class="task-wrapper">
     <span class="task-priority task-priority__${description? description.priority : ""}" style="display:none">${description? description.priority : ""}</span>
     <div class="task-header">
       <h3 class="task-title">${task.title}</h3>
       ...
     </div>
     <div class="task-body">
       <div class="task-pop-up__menu">
         <ul class="task-menu__list hide">
           <li class="task-menu__item">Rename</li>
           <li class="task-menu__item">Delete</li>
         </ul>
       </div>
       <div class="task-description" style="color:${description? description.color : ""}">${description? description.description : task.description}</div>
       <div class="task-footer">
         <h4 class="task-assignees__text">Assignees:</h4>
         <div class="task-assignees__container"></div>
         <div class="task-time">
         <span class="task-time__start">Duration: ${description? description.duration : ""}</span>
         </div>
       </div>
     </div>
     </div>
     </li> 
      `
     }
        )
   .join('')}
`;

const IsJsonString = (str: string) => {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return JSON.parse(str);
}

export default getTaskHTML;
