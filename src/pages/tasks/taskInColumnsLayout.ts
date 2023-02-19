import i18next from 'i18next';
import { ITasks } from '../../data/types';

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

     return `
      <li class="task" id="${task._id}">
     <div class="task-wrapper">
     <span class="task-priority task-priority__${description ? description.priority : ''}" style="display:none">${
       description ? description.priority : ''
     }</span>
     <div class="task-header">
       <h3 class="task-title">${task.title}</h3>
       ...
     </div>
     <div class="task-body">
       <div class="task-pop-up__menu">
         <ul class="task-menu__list hide">
           <li class="task-menu__item">${i18next.t('rename')}</li>
           <li class="task-menu__item">${i18next.t('delete')}</li>
         </ul>
       </div>
       <div class="task-description" style="color:${description ? description.color : ''}">${
       description ? description.description : task.description
     }</div>
       <div class="task-footer">
         <h4 class="task-assignees__text">${i18next.t('assignees')}:</h4>
         <div class="task-assignees__container"></div>
         <div class="task-time">
         <span class="task-time__start">${i18next.t('duration')}: ${description ? description.duration : ''}</span>
         <p class="start-date">${i18next.t('startDate')}: <span class="start-date__container"></span></p>
         <p class="end-date">${i18next.t('endDate')}: <span class="end-date__container"></span></p>
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
