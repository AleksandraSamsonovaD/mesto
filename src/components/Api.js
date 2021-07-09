export default class Api{
    constructor(url,token){
        this._url = url; 
        this._token = token;
    }
    getUserInfo(){
        return fetch(`${this._url}users/me`,{
            headers: {
                authorization: this._token
            }
        })
        .then(res =>{
            if (res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
    getCards(){
        return fetch(`${this._url}cards`,{
            headers: {
                authorization: this._token
            }
        })
        .then(res =>{
            if (res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
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
        .then(res =>{
            if (res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
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
        .then(res =>{
            if (res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
    deleteCard(id){
        return fetch(`${this._url}cards/${id}`,{
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(res=>{
            if (res.ok){
                return 'Удалено';
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
    setLike(id){
        return fetch(`${this._url}cards/likes/${id}`,{
            method: 'PUT',
            headers: {
                authorization: this._token
            }
        })
        .then(res=>{
            if (res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
    deleteLike(id){
        return fetch(`${this._url}cards/likes/${id}`,{
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(res=>{
            if (res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
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
        .then(res =>{
            if (res.ok){
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
}