import Observer from "../utils/observer";

export default class Comments extends Observer {
  constructor() {
    super();

    this._comments = [];
  }

  set comments(commentsList) {
    this._comments = commentsList.slice();
  }

  get comments() {
    return this._comments;
  }

  updateComment = (updateType, update) => {
    const index = this._comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film card`);
    }

    this._comments = [
      ...this._comments.slice(0, index),
      update,
      ...this._comments.slice(index + 1)
    ];

    this._notifyListeners(updateType, update);
  };

  addComment = (updateType, update) => {
    this._comments = [
      ...this._comments,
      update
    ];

    this._notifyListeners(updateType, update);
  }

  deleteComment = (updateType, update) => {
    const index = this._comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting film`);
    }

    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1)
    ];

    this._notifyListeners(updateType, update);
  }
}
