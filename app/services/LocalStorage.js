class LocalStorage {

    constructor(){

    }

    addDownloadedMemeToMyMemesList = (meme) => {

        if(!meme) {
            return;
        }

        let myMemesList = {};
        if(localStorage.getItem('myMemes')){
            myMemesList =  JSON.parse(localStorage.getItem('myMemes'));
            myMemesList[meme.id] = meme;
        }
        else {
            myMemesList[meme.id] = meme
        }

        localStorage.setItem('myMemes', JSON.stringify(myMemesList));
    }


    getItem = (name)=>{
        return JSON.parse(localStorage.getItem(name))
    }




}


export default new LocalStorage();