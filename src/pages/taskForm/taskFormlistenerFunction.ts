import { tsQuerySelector } from '../../helpers/helpers';

export const resetCreateTaskForm = () => {
  tsQuerySelector(document, '.new-card').classList.toggle(
    'new-card__active'
  );
  tsQuerySelector<HTMLFormElement>(document, '.new-card__form').reset()
}

