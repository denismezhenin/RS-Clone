import i18next from 'i18next';

const drawColumnPlus = async () => {
  const main = document.querySelector('.main-board');
  if (main) {
    const plusColumn = document.createElement('button');
    plusColumn.classList.add('plus-column');
    plusColumn.setAttribute('data-tooltip', i18next.t('addColumnTooltip'));
    main.append(plusColumn);
  }
};

export default drawColumnPlus;
