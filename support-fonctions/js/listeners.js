import handlers from './handlers.js';

const listeners = {
    bindInitialListeners: function(){
        this.listenSettings();
        this.listenLanguagueSwitcher();
        this.listenLever();
        this.listenScrews();
    },
    listenSettings: function(){
        const button = document.querySelector('.settings-button');
        button.addEventListener('click',handlers.handleSettingsPanel);

        const settings = document.querySelectorAll('.settings input');

        for(let input of settings){
            input.addEventListener('change', handlers.handleSettingsChange);
        }
    },
    listenLanguagueSwitcher: function(){
        const buttons =  document.querySelectorAll('.switch-language > div');

        for(let button of buttons) {
            button.addEventListener('click', handlers.handleLanguageSwitch);
        }
    },
    listenLever: function(){
        const lever = document.querySelector('.levier');

        lever.addEventListener('click', handlers.handleLever);
    },
    listenScrews: function(){
        const screws = document.querySelectorAll('.vis');

        for(let screw of screws){
            screw.addEventListener('click', handlers.handleScrews);
        }
        
    },
    listenDocumentClicks: function(callback){
        document.addEventListener('click',callback);
    }, 
    removeListenDocumentClicks: function(callback){
        document.removeEventListener('click', callback);
    }
}

export default listeners;