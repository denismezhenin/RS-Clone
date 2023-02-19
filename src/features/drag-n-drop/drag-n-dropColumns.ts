import Sortable from 'sortablejs';
import { tsQuerySelector } from '../../helpers/helpers';
import state from '../../state/state';
import { updateSetOfColumns } from '../../API/columns';
import { DRAG_N_DROP_ANIMATION_TIME, DRAG_N_DROP_DIRECTION } from '../../constants/constants';

const dragNdropColumns = async () => {
  const columnsList = tsQuerySelector(document, '.columns-list');
  Sortable.create(columnsList, {
    animation: DRAG_N_DROP_ANIMATION_TIME,
    direction: DRAG_N_DROP_DIRECTION,
    handle: '.column-header',
    async onEnd(e) {
      const columnsListArray = [...e.to.children].map((column, index) => ({
        _id: column.id,
        order: index,
      }));

      await updateSetOfColumns(state.authToken, columnsListArray);
    },
  });
};
export default dragNdropColumns;
