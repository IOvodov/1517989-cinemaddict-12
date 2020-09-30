import MovieList from "./presenter/movie-list.js";
import FilterPresenter from "./presenter/filter.js";
import UserProfilePresenter from "./presenter/user-profile.js";
import FilmsModel from "./model/films.js";
import FilterModel from "./model/filter.js";
import Api from "./api.js";
import {UpdateType} from "./const.js";
import FooterPresenter from "./presenter/footer.js";

const AUTHORIZATION = `Basic BqWoq4iifH8uLTYC`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

const api = new Api(END_POINT, AUTHORIZATION);

const userProfilePresenter = new UserProfilePresenter(header, filmsModel);
userProfilePresenter.init();

const filterPresenter = new FilterPresenter(main, filterModel, filmsModel);
filterPresenter.init();

const movieListPresenter = new MovieList(main, filmsModel, filterModel, api);
movieListPresenter.init();

const footerPresenter = new FooterPresenter(footer, filmsModel);
footerPresenter.init();

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });
