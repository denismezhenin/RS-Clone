import i18next from 'i18next';

const getPriorityTranslated = (priority: string) => {
  let result = '';
  const upperPriority = priority.toUpperCase();
  if (upperPriority === 'LOW' || upperPriority === 'ВЫСОКИЙ') {
    result = i18next.t('high');
  } else if (upperPriority === 'MEDIUM' || upperPriority === 'СРЕДНИЙ') {
    result = i18next.t('medium');
  } else {
    result = i18next.t('low');
  }

  return result;
};

export default getPriorityTranslated;
