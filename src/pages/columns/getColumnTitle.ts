import i18next from 'i18next';

const getColumnTitle = (title: string) => {
  let result = '';
  if (title === 'Todo' || title === 'Выполнить') {
    result = i18next.t('firstColumnName');
  } else if (title === 'In progress' || title === 'В работе') {
    result = i18next.t('secondColumnName');
  } else if (title === 'Done' || title === 'Сделано') {
    result = i18next.t('thirdColumnName');
  } else if (title === 'New column' || title === 'Новая колонка') {
    result = i18next.t('newColumnName');
  } else {
    result = title;
  }
  return result;
};

export default getColumnTitle;
