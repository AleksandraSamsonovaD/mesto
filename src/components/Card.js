export default class Card {
    constructor(cardData, cardSelector, handleCardClick, deleteOpen, likeSet, likeDelete) {
        this._cardSelector = cardSelector;
        this._name = cardData.name;
        this._url = cardData.addres;
        this._handleCardClick = handleCardClick;
        this._likes = cardData.likes;
        this._deleteOpen = deleteOpen;
        this._idUser = cardData.idUser;
        this._id = cardData.id;
        this._likeSet = likeSet;
        this._likeDelete = likeDelete;
        this.myLike = false;
    }
    _setEventListener(){
        this._element.querySelector('.element__trash').addEventListener('click',() => {
             this._deleteOpen(this._id, () => {this._removeElement();});
        });
        this._element.querySelector('.element__like').addEventListener('click',() => {
            //this._likeElement();
            if (this.myLike ){
                this._likeDelete(this._id, (cnt)=> {this._element.querySelector('.element__count').textContent = cnt;
                                                    this._likeElement();
                                                    this.myLike = false;
                                                });
            }
            else 
                this._likeSet(this._id, (cnt)=> {this._element.querySelector('.element__count').textContent = cnt;
                                             this._likeElement();
                                             this.myLike = true;} );
        });
        this._element.querySelector('.element__image').addEventListener('click',this._handleCardClick.bind(this));
    }

    _likeElement(){
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    _removeElement(){
        this._element.remove();
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
        return cardElement;
    };
    generateCard(user_id) {
        this._element = this._getTemplate();
        this._element.querySelector('.element__title').textContent = this._name;
        this._image = this._element.querySelector('.element__image');
        this._image.src = this._url;
        this._image.alt = this._name;
        this._element.querySelector('.element__count').textContent = this._likes.length;
        if (user_id == this._idUser){
            this._element.querySelector('.element__trash').classList.add('element__trash_active');
        }
        this._likes.forEach((liker)=>{
            if (liker._id == user_id){
                this._likeElement();
                this.myLike = true;
            }
        })
            

        this._setEventListener();

        return this._element;
    }
};