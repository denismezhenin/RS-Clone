import { ITasks } from '../../data/types';
import state from '../../state/state';

const sortTasks = (tasks: ITasks[]) => {
  const result: ITasks[] = [];
  tasks.forEach((el) => {
    const description = JSON.parse(el.description);
    const { priority } = description;
    const index = result.findIndex((item) => {
      const itemDescription = JSON.parse(item.description);
      const { priority: itemPriority } = itemDescription;
      return state.order === 'ASC'
        ? itemPriority === 'high' || itemPriority === 'высокий'
        : itemPriority === 'low' || itemPriority === 'низкий';
    });

    if (state.order === 'ASC') {
      if (priority === 'low' || priority === 'низкий') {
        result.unshift(el);
      }
      if (priority === 'high' || priority === 'высокий') {
        result.push(el);
      }
    } else {
      if (priority === 'low' || priority === 'низкий') {
        result.push(el);
      }
      if (priority === 'high' || priority === 'высокий') {
        result.unshift(el);
      }
    }

    if (priority === 'medium' || priority === 'средний') {
      result.splice(index, 0, el);
    }
  });
  return result;
};
export default sortTasks;
