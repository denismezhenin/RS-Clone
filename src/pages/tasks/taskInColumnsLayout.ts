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
     <li class="task task__${description ? description.priority : ''}" id="${task._id}">
     <div class="task-wrapper">
     <div class="task-header">
     <figure class="task__roasted">
        <img class="task__roasted-gif"src="../../assets/img/fire-joypixels.gif">
        <img class="task__roasted-icon" src="../../assets/icons/icons8-done.svg">
      </figure>
     <span class="task-priority task-priority__${description ? description.priority : ''}" >${
       description ? description.priority : ''
     }</span>
     <div class="task-pop-up__menu">...
     <ul class="task-menu__list hide">
     <li class="task-menu__item edit-task">${i18next.t('rename')}</li>
     <li class="task-menu__item delete-task">${i18next.t('delete')}</li>
     </ul>
     </div>
     </div>
     <h3 class="task-title" style="color:${description ? description.color : ''}">${task.title}</h3>
     <div class="task-body">
       <p class="task-description">${description ? description.description : task.description}</p>
       <div class="task-footer">
       <div class="task-assignees">
       <div class="task-assignees__container" data-users="${task.users}" data-ID="${task._id}"></div>
       <div class="task-duration">
       <span class="task-time__start">${i18next.t('duration')}: </span>
       <span class="task-time__duration">${description ? String(description.duration).toUpperCase() : ''}</span>
       </div>
       </div>
         <div class="task-time">
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
