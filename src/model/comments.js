import Observer from "../utils/observer";

export default class CommentsModel extends Observer {
  constructor() {
    super();

    this._comments = [];
  }

  setComments(commentsList) {
    this._comments = commentsList.slice();
  }

  getComments() {
    return this._comments;
  }

  addComment(updateType, update) {
    this._comments = [
      ...this._comments,
      update
    ];

    this._notifyListeners(updateType, update);
  }

  deleteComment(updateType, update) {
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

  static adaptToClient(comment) {
    const adaptedComment = Object.assign(
        {},
        comment,
        {
          emoji: comment.emotion,
          message: comment.comment,
          date: new Date(comment.date)
        }
    );

    delete adaptedComment.emotion;
    delete adaptedComment.comment;

    return adaptedComment;
  }

  static adaptToServer(comment) {
    const adaptedComment = Object.assign(
        {},
        comment,
        {
          emotion: comment.emoji,
          comment: comment.message
        }
    );

    delete adaptedComment.emoji;
    delete adaptedComment.message;

    return adaptedComment;
  }
}
