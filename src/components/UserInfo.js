export default class UserInfo {
    constructor({name, description, avatar}){
        this._name = document.querySelector(name);
        this._description = document.querySelector(description);
        this._avtar = document.querySelector(avatar);
    }
    getUserInfo(){
        return {
            name: this._name.textContent,
            description: this._description.textContent,
        };
    }
    setUserInfo({ name, description,avatar}){
        this._name.textContent = name;
        this._description.textContent = description;
        this._avtar.src = avatar;
    }
}