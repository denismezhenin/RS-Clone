import { tsQuerySelector } from '../../helpers/helpers';

const toggleButtonStatistics = () => {
  const statsticsGeneralButton = <HTMLInputElement>tsQuerySelector(document, '.statstics-general__button');
  const statsticsUsersButton = <HTMLInputElement>tsQuerySelector(document, '.statstics-users__button');
  const generalStatistics = tsQuerySelector(document, '.general-statistics');
  const userStatistics = tsQuerySelector(document, '.user-statistics');

  const generalDoughnutButton = <HTMLInputElement>tsQuerySelector(document, '.general-doughnut__button');
  const generalBarButton = <HTMLInputElement>tsQuerySelector(document, '.general-bar__button');

  if (statsticsGeneralButton.checked) {
    generalStatistics.classList.remove('hide');
    userStatistics.classList.add('hide');

    const statisticsIdGeneralDoughnut = <HTMLCanvasElement>tsQuerySelector(document, '.statisticsId-general__doughnut');
    const statisticsIdGeneralBar = <HTMLCanvasElement>tsQuerySelector(document, '.statisticsId-general__bar');
    if (generalDoughnutButton.checked) {
      statisticsIdGeneralBar.style.display = 'none';
      statisticsIdGeneralDoughnut.style.display = '';
    }
    if (generalBarButton.checked) {
      statisticsIdGeneralBar.style.display = '';
      statisticsIdGeneralDoughnut.style.display = 'none';
    }
  }
  if (statsticsUsersButton.checked) {
    generalStatistics.classList.add('hide');
    userStatistics.classList.remove('hide');
  }
};
export default toggleButtonStatistics;
