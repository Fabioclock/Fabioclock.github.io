import listeners from './listeners.js';
import handlers from './handlers.js';
import sandwich from './sandwich.js';
import code from './codes.js';

const app = {
    currentLanguage: "",
    screws: "",
    lid: "",
    // Default settings
    settings: {
        parameter: false,
        return: false,
        variable: false,
    },
    init: function(){
        // Setup current language
        const lang = document.querySelector('.switch-language .active').textContent;
        app.currentLanguage = lang;

        app.screws = document.querySelectorAll('.vis');
        app.lid = document.querySelector('.capot');

        app.generateIngredientSelects();

        // Setup listeners
        listeners.bindInitialListeners();

        
        app.applySettings();

        code.write();

        code.basicTooltips();

    }, 
    // Remove the lid to view the machine inner organs
    unlidMachine: function(){
        for (let screw of app.screws) {
            screw.classList.add('unscrew');
        }
        setTimeout(function() {
            for (let screw of app.screws) {
                screw.classList.remove('unscrew');
            }  
            app.lid.classList.add('removed');
        }, 1000);
    }, 
    // Put the lid back on
    lidMachine: function(){
        app.lid.classList.remove('removed');
        app.punctualClass(app.lid, 'backon');
    }, 
    updateSettings: function(setting, value) {
        app.settings[setting] = value;

        app.applySettings();
    }, 
    // The settings are translated to a classname on the main tag
    applySettings: function(){
        const main = document.querySelector('main');
        main.className = "";

        for(let setting in app.settings) {
            if(app.settings[setting] === true) {
                main.classList.add(setting);
            }
        }
        sandwich.wipe();
        code.write();
    },
    generateIngredientSelects: function(){
        const selects = document.querySelectorAll('.select');
        for(let select of selects) {
            select.addEventListener('click', handlers.handleOpenIngredientPanel);
            const type = select.dataset.type;
            const elements = sandwich[type];
            for(const element of elements) {
                let elementContainer = document.createElement('div');
                let img = document.createElement('img');
                img.setAttribute('src','./img/'+element+'.svg');
                elementContainer.className = 'ingredient '+element;
                elementContainer.dataset.name = element;
                elementContainer.dataset.tippyContent = element;
                elementContainer.appendChild(img);
                elementContainer.addEventListener('click', handlers.handleSelectIngredient);
                select.querySelector('.elements').appendChild(elementContainer);
            }
        }
    },
    errorOnIngredient: function(ingredient) {
        const select = document.querySelector('.select[data-slot="'+ingredient+'"]');
        app.punctualClass(select, 'animate__shakeX');
    },
    // Gives an element a class, then removes it after a given time
    punctualClass: function(element, classname, time = 1000) {
        element.classList.add(classname);
        setTimeout(function() {
            element.classList.remove(classname);
        }, time);
    }
}

document.addEventListener('DOMContentLoaded', app.init);

export default app;