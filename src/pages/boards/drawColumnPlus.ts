const drawColumnPlus = async () => {
  const boardLayout = document.querySelector('.main-board');
  if (boardLayout) {
    const plusColumn = document.createElement('button');
    plusColumn.classList.add('plus-column');
    boardLayout.append(plusColumn);
  }
};

export default drawColumnPlus;
