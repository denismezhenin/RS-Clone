const taskForm = () => {
  const HTML = `
  <div class="new-card">
        <form action="" class="new-card__form create-card">
            <h3>New Task</h3>
            <div class="create-card__line">
              <div class="create-card__line-left input-wrapper">
              <input type="text" name="title" id="title" class="create-card__line-left__input form-input" placeholder="Please enter the subject!">
              <span class="input-wrapper-highlight"></span>
              <span class="input-wrapper-bar"></span>
              <label for="title" class="create-card__line-left__label form-label">Title</label>
              </div>
              <div class="create-card__line-right input-wrapper">
              <input type="color" name="color" id="color" class="create-card__line-right__color form-input">
              <label for="color" class="color-label form-label">Pick a color</label>
              </div>
            </div>
            <div class="create-card__line">
              <div class="create-card__line-left input-wrapper">
              <textarea type="text" name="description" id="description" placeholder="Add a description" class="create-card__line-left__textarea form-input"></textarea>
              <span class="input-wrapper-highlight"></span>
              <label for="description" class="create-card__line-left__label form-label">Description</label>    
              </div>
              <div class="create-card__line-right input-wrapper">

              </div>
            </div>

            <div class="create-card__line-date">
            <div class="input-wrapper">
            <input type="date" id="start-date" name="start-date" placeholder="Please enter starting date" class="create-card__line-date__start-date form-input" >
            <span class="input-wrapper-highlight"></span>
            <span class="input-wrapper-bar"></span>
            <label for="start-date" class="date-label form-label">Starting date</label>
            </div>
            <div class="input-wrapper">
            <input type="date" id="end-date" name="end-date" placeholder="Please enter ending date" class="create-card__line-date__end-date form-input">
            <span class="input-wrapper-highlight"></span>
            <span class="input-wrapper-bar"></span>
            <label for="end-date" class="date-label form-label">Ending date</label>
            </div>
            </div>
            
          
            <div class="create-card__priority">
              <p class="create-card__priority-title">Priority</p>
              <input type="radio" name="priority" id="priority-high" value="high"class="create-card__priority-select">
              <label for="priority-high" class="create-card__priority-label">high</label>
              <input type="radio"  name="priority" id="priority-medium" value="medium"class="create-card__priority-select">
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
  return HTML
} 

export default taskForm;
