import i18next from 'i18next';
import invitetoTaskHTML from './invitetoTask';
import { User } from '../../data/types';

const taskFormHTML = (users: User[]) => {
  const HTML = `
  <div class="new-card">
        <form action="" class="new-card__form create-card">
            <h3>${i18next.t('newTask')}</h3>
            <div class="create-card__line">
              <div class="create-card__line-left input-wrapper">
              <input type="text" name="title" id="title" class="create-card__line-left__input form-input" placeholder=${i18next.t(
                'taskNamePlaceholder'
              )}>
              <span class="input-wrapper-highlight"></span>
              <span class="input-wrapper-bar"></span>
              <label for="title" class="create-card__line-left__label form-label">${i18next.t('taskTitle')}</label>
              </div>
              <div class="create-card__line-right input-wrapper">
              <input type="color" name="color" id="color" class="create-card__line-right__color form-input">
              <label for="color" class="color-label form-label">${i18next.t('pickColor')}</label>
              </div>
            </div>
            <div class="create-card__line">
              <div class="create-card__line-left input-wrapper">
              <textarea type="text" name="description" id="description" placeholder=${i18next.t(
                'taskDescriptionPlaceholder'
              )} class="create-card__line-left__textarea form-input"></textarea>
              <span class="input-wrapper-highlight"></span>
              <label for="description" class="create-card__line-left__label form-label">${i18next.t(
                'taskDescription'
              )}</label>    
              </div>
              <div class="create-card__line-right input-wrapper">

              </div>
            </div>

            <div class="create-card__line-date">
              <label for="duration">${i18next.t('durationChoice')}</label>
                <select select name="duration" id="duration">
                <option value="">${i18next.t('duration')}</option>
                <option value="xs">XS  -  ${i18next.t('oneHour')}</option>
                <option value="s">S   -  ${i18next.t('twoHours')}</option>
                <option value="mr">M   -  ${i18next.t('threeHours')}</option>
                <option value="l">L   -  ${i18next.t('fourHours')}</option>
                <option value="xl">XL   -  ${i18next.t('sixHours')}</option>
                <option value="xxl">XXL   -  ${i18next.t('eightHours')}</option>
            </select>
            <div class="input-wrapper" style="display: none">
            <input type="date" id="start-date" name="start-date" placeholder=${i18next.t(
              'startDatePlaceholder'
            )} class="create-card__line-date__start-date form-input" >
            <span class="input-wrapper-highlight"></span>
            <span class="input-wrapper-bar"></span>
            <label for="start-date" class="date-label form-label">${i18next.t('startDate')}</label>
            </div>
            <div class="input-wrapper" style="display: none">
            <input type="date" id="end-date" name="end-date" placeholder=${i18next.t(
              'endDatePlaceholder'
            )} class="create-card__line-date__end-date form-input">
            <span class="input-wrapper-highlight"></span>
            <span class="input-wrapper-bar"></span>
            <label for="end-date" class="date-label form-label">${i18next.t('endDate')}</label>
            </div>
            </div>
            <div class="create-card__members">
            ${invitetoTaskHTML(users)}
            </div>
            <div class="create-card__priority">
              <p class="create-card__priority-title">${i18next.t('priority')}</p>
              <input type="radio" name="priority" id="priority-high" value="high"class="create-card__priority-select">
              <label for="priority-high" class="create-card__priority-label">${i18next.t('high')}</label>
              <input type="radio"  name="priority" id="priority-medium" value="medium"class="create-card__priority-select">
              <label for="priority-medium" class="create-card__priority-label">${i18next.t('medium')}</label>
              <input type="radio"  name="priority" id="priority-low" value="low" class="create-card__priority-select">
              <label for="priority-low" class="create-card__priority-label">${i18next.t('low')}</label>
            </div>
    
            <div class="create-card-action">
              <button type="reset" class="create-card-action-cancel button-round">${i18next.t('cancelBtn')}</button>
              <button type="submit" class="create-card-action-submit button-round">${i18next.t('addTaskBtn')}</button>
            </div>
      </form>
  </div>`;
  return HTML;
};

export default taskFormHTML;
