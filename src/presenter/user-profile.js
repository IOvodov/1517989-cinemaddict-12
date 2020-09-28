import Observer from "../utils/observer.js";
import {renderElement, replace, remove} from "../utils/render.js";
import {getRank} from "../utils/user-profile.js";
import UserProfileView from "../view/user-profile.js";


export default class UserProfilePresenter extends Observer {
  constructor(userProfileContainer, filmsModel) {
    super();

    this._userProfileContainer = userProfileContainer;
    this._filmsModel = filmsModel;

    this._userComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    const userRank = this._getUserRank();

    const prevUserComponent = this._userComponent;
    this._userComponent = new UserProfileView(userRank);

    if (!prevUserComponent) {
      renderElement(this._userProfileContainer, this._userComponent);
      return;
    }

    replace(this._userComponent, prevUserComponent);
    remove(prevUserComponent);
  }

  destroy() {
    remove(this._userComponent);
    this._filmsModel.removeObserver(this._handleModelEvent);
  }

  _handleModelEvent() {
    this.init();
  }

  _getUserRank() {
    let films = this._filmsModel.getFilms();
    const watchedFilms = films.filter((item) => item.isWatched);

    return getRank(watchedFilms);
  }
}
