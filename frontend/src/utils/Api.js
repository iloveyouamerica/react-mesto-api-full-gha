
export class Api {
  constructor({baseUrl, token}) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  // метод обработки результата ответа сервера
  _checkResponse(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(new Error('Произошла ошибка получения данных с сервера'));
  }

  // метод для загрузки информации о пользователе с сервера
  getUserInfo() {
    // создаём запрос на сервер для получения информации о пользователе, которая хранится на сервере
    return fetch(`${this._baseUrl}/users/me`, {
      /* headers: {
        authorization: this._token
      } */
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`, // фиксил баг, так работает
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse);
  }

  // метод получения карточек с сервера
  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      /* headers: {
        authorization: this._token
      } */
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`, // фиксил баг, так работает
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse);
  }

  // метод для редактирования профиля
  editUserProfile({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`, // фиксил баг, так работает
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._checkResponse);
  }

  // метод для добавления новой карточки
  addNewCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`, // фиксил баг, так работает
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._checkResponse);
  }

  // метод для удаления карточки https://mesto.nomoreparties.co/v1/cohortId/cards/cardId 
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`, // фиксил баг, так работает
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse);
  }

  // метод для добавления лайка карточке https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes
  addLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`, // фиксил баг, так работает
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse);
  }

  // метод для удаления лайка карточке https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes
  deleteLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`, // фиксил баг, так работает
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse);
  }

  // метод для добавление и удаления лайка карточки (2 в 1), путь: https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`, // фиксил баг, так работает
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }

  // метод для редактирования аватара пользователя PATCH https://mesto.nomoreparties.co/v1/cohortId/users/me/avatar 
  changeAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`, // фиксил баг, так работает
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
      .then(this._checkResponse);
  }

}

const api = new Api({
  //baseUrl: 'http://localhost:3001', // на сервер
  baseUrl: 'https://api.mesto.frontend.nomoredomains.rocks', // на сервер
  token: `Bearer ${localStorage.getItem('token')}`,
  /* baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  token: '5ade358d-5f88-408c-b48d-f9edcc6552b1' */
});

export default api;
