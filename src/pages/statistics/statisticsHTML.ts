import i18next from 'i18next';
import getAsideHtml from '../home/getAsideHtml';

const getStatisticsHTML = () =>
  `
  <div class="main_home">
  ${getAsideHtml()}
  <div class="main-statisticsId">
    <h2 class="statisticsId-title"></h2>
    <form class="statisticsId-button__form">
      <div class="statisticsId-button__item">
        <input type="radio" id="general-button" name="statistics" class="statstics-general__button" checked />
        <label for="general-button">${i18next.t('generalStatistics')}</label>
      </div>
      <div class="statisticsId-button__item">
        <input type="radio" id="users-button" name="statistics" class="statstics-users__button" />
        <label for="users-button">${i18next.t('usersStatistics')}</label>
      </div>
    </form>
    <div class="general-statistics">
      <canvas class="statisticsId-general__doughnut"></canvas>
      <canvas class="statisticsId-general__bar"></canvas>
      <form class="general-button__form">
        <div class="statisticsId-button__item chart-view__buttons">
          <input
            type="radio"
            id="general-doughnut"
            name="general-statistics"
            class="general-doughnut__button"
            checked
          />
          <label for="general-doughnut"><img class="statistics-icon" src="../../assets/icons/doughnut.svg" alt="doughnut"></label>
        </div>
        <div class="statisticsId-button__item chart-view__buttons">
          <input type="radio" id="general-bar" name="general-statistics" class="general-bar__button" />
          <label for="general-bar"><img class="statistics-icon" src="../../assets/icons/bar.svg" alt="doughnut"></label>
        </div>
      </form>
    </div>
    <div class="user-statistics">
      <div class="member-icons"></div>
      <p class="user-statistics__text">${i18next.t('clickOnUsers')}</p>
      <canvas class="statisticsId-user__doughnut"></canvas>
    </div>
  </div>
</div>
      `;
export default getStatisticsHTML;
