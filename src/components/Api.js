export default class Api{
    constructor(url,token){
        this._url = url; 
        this._token = token;
    }
    _checkResponse(res){
        if (res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    getUserInfo(){
        return fetch(`${this._url}users/me`,{
            headers: {
                authorization: this._token
            }
        })
        .then(this._checkResponse);
    }
    getCards(){
        return fetch(`${this._url}cards`,{
            headers: {
                authorization: this._token
            }
        })
        .then(this._checkResponse);
    }
    setUserInfo(info){
        return fetch(`${this._url}users/me`,{
            method: 'PATCH',
            headers:{
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        .then(this._checkResponse);
    }
    setCard(data){
        return fetch(`${this._url}cards`,{
            method: 'POST',
            headers:{
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(this._checkResponse);
    }
    deleteCard(id){
        return fetch(`${this._url}cards/${id}`,{
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(this._checkResponse);
    }
    setLike(id){
        return fetch(`${this._url}cards/likes/${id}`,{
            method: 'PUT',
            headers: {
                authorization: this._token
            }
        })
        .then(this._checkResponse);
    }
    deleteLike(id){
        return fetch(`${this._url}cards/likes/${id}`,{
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(this._checkResponse);
    }
    editAvatar(url){
        return fetch(`${this._url}users/me/avatar`,{
            method: 'PATCH',
            headers:{
                authorization: this._token ,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(url)
        })
        .then(this._checkResponse);
    }
}