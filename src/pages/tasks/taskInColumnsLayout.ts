import { ITasks } from '../../data/types';

const getTaskHTML = (tasks: ITasks[]) =>
  `
  <ul class="tasks-list">
 ${tasks
   .map(
     (task: ITasks) =>  {
       let description = IsJsonString(task.description); 
      // if (typeof(JSON.parse(task.description)) =='object') {
      //  description = JSON.parse(task.description)
      // }

      console.log(description)
      return `
      <li class="task" id="${task._id}">
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
       <div class="task-description" style="color:${description? description.color : ""}">${description? description.description : task.description}</div>
       <div class="task-footer">
         <h4 class="task-assignees__text">Assignees:</h4>
         <div class="task-assignees__container"></div>
       </div>
     </div>
     </div>
     </li> 
      `
     }
        )
   .join('')}
 
  
</ul>
`;


function IsJsonString(str: string) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return JSON.parse(str);
}

export default getTaskHTML;
