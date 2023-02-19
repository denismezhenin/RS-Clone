import invitetoTaskHTML from './invitetoTask';
import { User } from '../../data/types';

const taskFormHTML = (users: User[]) => {
  const HTML = `
  <div class="new-card">
        <form action="" class="new-card__form create-card">
            <h3>New Task</h3>
            <div class="create-card__line">
              <div class="create-card__line-left input-wrapper">
              <input type="text" name="title" id="title" class="create-card__line-left__input form-input" placeholder="Please enter the subject!" required>
              <span class="input-wrapper-highlight"></span>
              <span class="input-wrapper-bar"></span>
              <label for="title" class="create-card__line-left__label form-label">Title</label>
              </div>
              <div class="create-card__line-right input-wrapper">
              <input type="color" name="color" id="color" class="create-card__line-right__color form-input" required>
              <label for="color" class="color-label form-label">Pick a color</label>
              </div>
            </div>
            <div class="create-card__line">
              <div class="create-card__line-left input-wrapper">
              <textarea type="text" name="description" id="description" placeholder="Add a description" class="create-card__line-left__textarea form-input" required></textarea>
              <span class="input-wrapper-highlight"></span>
              <label for="description" class="create-card__line-left__label form-label">Description</label>    
              </div>
              <div class="create-card__line-right input-wrapper">

              </div>
            </div>

            <div class="create-card__line-date">
              <label for="duration">Choose a duration:</label>
                <select select name="duration" id="duration" required>
                <option value="">Duration</option>
                <option value="xs">XS  -  1 hour</option>
                <option value="s">S   -  2 hours</option>
                <option value="mr">M   -  3 hours</option>
                <option value="l">L   -  4 hours</option>
                <option value="xl">XL   -  6 hours</option>
                <option value="xxl">XXL   -  8 hours</option>
            </select>
            <div class="input-wrapper" style="display: none">
            <input type="date" id="start-date" name="start-date" placeholder="Please enter starting date" class="create-card__line-date__start-date form-input" >
            <span class="input-wrapper-highlight"></span>
            <span class="input-wrapper-bar"></span>
            <label for="start-date" class="date-label form-label">Starting date</label>
            </div>
            <div class="input-wrapper" style="display: none">
            <input type="date" id="end-date" name="end-date" placeholder="Please enter ending date" class="create-card__line-date__end-date form-input" >
            <span class="input-wrapper-highlight"></span>
            <span class="input-wrapper-bar"></span>
            <label for="end-date" class="date-label form-label">Ending date</label>
            </div>
            </div>
            <div class="create-card__members">
            ${invitetoTaskHTML(users)}
            </div>
            <div class="create-card__priority">
              <p class="create-card__priority-title">Priority</p>
              <input type="radio" name="priority" id="priority-high" value="high"class="create-card__priority-select">
              <label for="priority-high" class="create-card__priority-label">high</label>
              <input type="radio"  name="priority" id="priority-medium" value="medium"class="create-card__priority-select" checked>
              <label for="priority-medium" class="create-card__priority-label">medium</label>
              <input type="radio"  name="priority" id="priority-low" value="low" class="create-card__priority-select">
              <label for="priority-low" class="create-card__priority-label">low</label>
            </div>
    
            <div class="create-card-action">
              <button type="reset" class="create-card-action-cancel button-round">cancel</button>
              <button type="submit" class="create-card-action-submit button-round">add task</button>
            </div>
      </form>
  </div>`;
  return HTML;
};

export default taskFormHTML;
