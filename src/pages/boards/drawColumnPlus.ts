import i18next from 'i18next';

const drawColumnPlus = async () => {
  const columnsHtml = document.querySelector('.columns-list');
  if (columnsHtml) {
    const plusColumn = document.createElement('button');
    plusColumn.classList.add('plus-column');
    plusColumn.setAttribute('data-tooltip', i18next.t('addColumnTooltip'));
    columnsHtml.append(plusColumn);
  }
};

export default drawColumnPlus;
