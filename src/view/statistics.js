import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart.js';
import {totalDuration, sortedGenres, topGenre} from '../utils/statistics.js';
import {StatisticFilterType} from '../const.js';

const BAR_HEIGHT = 50;

const renderChart = (statisticCtx, data) => {
  const watched = data.filter((item) => item.isWatched);
  const amountWatchedGenres = sortedGenres(watched);

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: Object.keys(amountWatchedGenres),
      datasets: [{
        data: Object.values(amountWatchedGenres),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const createDurationTemplate = (watched) => {
  const toTime = totalDuration(watched);
  return (
    `<p class="statistic__item-text">${toTime[0]} <span class="statistic__item-description">h</span> ${toTime[1]} <span class="statistic__item-description">m</span></p>`
  );
};

const createStatisticFiltersTemplate = (currentFilter) => {
  return (
    `<form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${StatisticFilterType.ALL}" value="${StatisticFilterType.ALL}" ${currentFilter === StatisticFilterType.ALL ? `checked` : ``}>
      <label for="statistic-${StatisticFilterType.ALL}" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${StatisticFilterType.TODAY}" value="${StatisticFilterType.TODAY}" ${currentFilter === StatisticFilterType.TODAY ? `checked` : ``}>
      <label for="statistic-${StatisticFilterType.TODAY}" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${StatisticFilterType.WEEK}" value="${StatisticFilterType.WEEK}" ${currentFilter === StatisticFilterType.WEEK ? `checked` : ``}>
      <label for="statistic-${StatisticFilterType.WEEK}" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${StatisticFilterType.MONTH}" value="${StatisticFilterType.MONTH}" ${currentFilter === StatisticFilterType.MONTH ? `checked` : ``}>
      <label for="statistic-${StatisticFilterType.MONTH}" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${StatisticFilterType.YEAR}" value="${StatisticFilterType.YEAR}" ${currentFilter === StatisticFilterType.YEAR ? `checked` : ``}>
      <label for="statistic-${StatisticFilterType.YEAR}" class="statistic__filters-label">Year</label>
    </form>`
  );
};

const createStatisticTemplate = (statisticData = {}, currentFilter) => {
  const watched = statisticData.filter((item) => item.isWatched);
  const watchedAmount = watched.length;

  const filtersTemplate = createStatisticFiltersTemplate(currentFilter);
  const topGenreTemplate = topGenre(watched);
  const durationTemplate = createDurationTemplate(watched);

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">Sci-Fighter</span>
      </p>
      ${filtersTemplate}
      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${watchedAmount} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          ${durationTemplate}
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenreTemplate}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>
    </section>`
  );
};

export default class StatisticView extends SmartView {
  constructor(statisticData, currentFilter) {
    super();

    this._statisticData = statisticData;
    this._currentFilter = currentFilter;

    this._setChart();

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  get template() {
    return createStatisticTemplate(this._statisticData, this._currentFilter);
  }

  _setChart() {
    const statisticCtx = this.element.querySelector(`.statistic__chart`);
    statisticCtx.height = BAR_HEIGHT * 5;
    this._cart = renderChart(statisticCtx, this._statisticData);
  }

  _filterTypeChangeHandler(event) {
    if (event.target.tagName !== `INPUT`) {
      return;
    }

    event.preventDefault();
    this._handlers.filterTypeChange(event.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._handlers.filterTypeChange = callback;
    this.element.addEventListener(`click`, this._filterTypeChangeHandler);
  }
}
