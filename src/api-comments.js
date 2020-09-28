import CommentsModel from "./model/comments.js";

const Method = {
  GET: `GET`,
  POST: `POST`,
  DELETE: `DELETE`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class ApiComments {
  constructor(endPoint, authorization, filmId) {
    this._endPoint = endPoint;
    this._authorization = authorization;
    this._filmId = filmId;
  }

  getComments() {
    return this._load({url: `comments/${this._filmId}`})
      .then(ApiComments.toJSON)
      .then((comments) => comments.map(CommentsModel.adaptToClient));
  }

  addComment(comment) {
    return this._load({
      url: `comments/${this._filmId}`,
      method: Method.POST,
      body: JSON.stringify(CommentsModel.adaptToServer(comment)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(ApiComments.toJSON)
      .then((response) => response.comments.map(CommentsModel.adaptToClient));
  }

  deleteComment(comment) {
    return this._load({
      url: `comments/${comment.id}`,
      method: Method.DELETE
    });
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(ApiComments.checkStatus)
      .catch(ApiComments.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN &&
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
