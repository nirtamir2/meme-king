class LocalStorage {

    init = () => {

        if (this.getItem('myMemes') && !this.getItem('isAlreadyCleared')) {
            localStorage.clear();
            localStorage.setItem('isAlreadyCleared' , true );
        } else {
            localStorage.setItem('isAlreadyCleared' , true );
        }

        console.log('init local storage service', localStorage)

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

    setItem = (item) => {
        localStorage.setItem(JSON.stringify(item));
    }


    getItem = (name)=>{
        return JSON.parse(localStorage.getItem(name))
    }




}


export default new LocalStorage();