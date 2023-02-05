const taskForm = `
        <form action="" class="new-card__form create-card">
            <h3>new-card</h3>
            <div class="create-card__line">
              <div class="create-card__line-left">
                <label for="title" class="create-card__line-left__label">Title</label>
                <input type="text" name="title" id="title" class="create-card__line-left__input" placeholder="Please enter the subject!">
              </div>
              <div class="create-card__line-right">
                <label for="color">Pick a color</label>
                <input type="color" name="color" id="color" class="create-card__line-right__color" >
              </div>
            </div>
            <div class="create-card__line">
              <div class="create-card__line-left">
                <label for="description" class="create-card__line-left__label">Description</label>    
                <textarea type="text" name="description" id="description" placeholder="Add a description" class="create-card__line-left__textarea"></textarea>
              </div>
              <div class="create-card__line-right">

              </div>
            </div>

            <div class="create-card__line-date">
              <label for="start-date">Starting date</label>
              <input type="date" id="start-date" name="start-date" placeholder="Please enter starting date" class="create-card__line-date__start-date" >
              <label for="end-date">Ending date</label>
              <input type="date" id="end-date" name="end-date" placeholder="Please enter ending date" class="create-card__line-date__end-date">
            </div>
            
          
            <div class="create-card__priority">
              <p class="create-card__priority-title">Priority</p>
              <span class="create-card__priority-select">high</span>
              <span class="create-card__priority-select">medium</span>
              <span class="create-card__priority-select">low</span>
            </div>
    
            <div class="create-card-action">
              <button class="create-card-action-cancel button-round">cancel</button>
              <button class="create-card-action-submit button-round">add card</button>
            </div>
        </form>`;

export default taskForm;
