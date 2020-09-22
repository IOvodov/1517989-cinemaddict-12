import UserProfile from "./view/user-profile.js";
import Menu from "./view/site-menu.js";
import FooterStatistics from "./view/footer-statistics.js";
import {generateFilmCard} from "./mock/film-card.js";
import {renderElement} from "./utils/render.js";
import {generateUserProfile} from "./mock/user-profile.js";
import {generateFilmsFilter} from "./mock/filter.js";
import MovieList from "./presenter/movie-list.js";

const FILM_CARDS_COUNT = 20;

const filmCards = new Array(FILM_CARDS_COUNT).fill().map(generateFilmCard);
const profile = generateUserProfile();
const filter = generateFilmsFilter(filmCards);

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

renderElement(header, new UserProfile(profile));
renderElement(main, new Menu(filter));

const movieListPresenter = new MovieList(main);
movieListPresenter.init(filmCards);

renderElement(footer, new FooterStatistics(filmCards.length));
