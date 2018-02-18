class LocalStorage {

    init = () => {

        if (this.getItem('myMemes') && !this.getItem('isAlreadyCleared')) {
            localStorage.clear();
            localStorage.setItem('isAlreadyCleared' , true );
        } else {
            localStorage.setItem('isAlreadyCleared' , true );
        }


    }

    addDownloadedMemeToMyMemesList = (meme) => {

        if(!meme) {
            return;
        }

        let myMemesList = {};
        if(this.getItem('myMemes')){
            myMemesList =  JSON.parse(localStorage.getItem('myMemes'));
            myMemesList[meme.id] = meme;
        }
        else {
            myMemesList[meme.id] = meme
        }

        localStorage.setItem('myMemes', JSON.stringify(myMemesList));
    }

    setItem = (item, value) => {
        localStorage.setItem(item, value);
    }


    getItem = (name) => {
        return JSON.parse(localStorage.getItem(name))
    }




}


export default new LocalStorage();