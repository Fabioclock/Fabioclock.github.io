import app from './app.js';
import code from './codes.js';
import listeners from './listeners.js';
import sandwich from './sandwich.js';

const handlers = {
    handleLanguageSwitch: function(){
        const buttons = document.querySelectorAll('.switch-language > div');
        // Toggle the active class on each button
        for(let button of buttons) {
            button.classList.toggle('active');
            if(button.classList.contains('active')){
                // Saving the current language
                app.currentLanguage = button.textContent;
            }
        }
        code.write();
    },
    handleLever: function(event){
        const lever = event.target;

        app.punctualClass(lever, 'down');
        sandwich.wipe();
        setTimeout(() => {
            sandwich.make();
        }, 600);
    },
    handleScrews: function(event) {
        if(app.lid.classList.contains('removed')){
            app.lidMachine();
        } else {
            app.unlidMachine();
        }
    },
    handleSettingsPanel: function(event) {
        // Prevent triggering the potential eventListener we gonna place
        if(event) {
            event.stopImmediatePropagation();
        }

        const settings = document.querySelector('.settings');
        settings.classList.toggle('open');

        if(settings.classList.contains('open')){
            listeners.listenDocumentClicks(handlers.handleCloseSettings);
        } else {
            listeners.removeListenDocumentClicks(handlers.handleCloseSettings);
        }
    }, 
    handleCloseSettings: function(event) {
        // Check if the click is done inside the settings panel
        if(!event.target.classList.contains('settings') && !event.target.closest('.settings')) {
            handlers.handleSettingsPanel();
        }
    }, 
    handleSettingsChange: function(event) {
        app.updateSettings(event.target.id, event.target.checked);
    }, 
    handleOpenIngredientPanel: function(event) {
        if(event) {
            event.stopImmediatePropagation();
        }
        const slot = event.target.closest('.select');
        
        const select = slot.querySelector('.select .elements');
        select.classList.add('animate__slideInDown');
        select.classList.add('active');

        listeners.listenDocumentClicks(handlers.handleCloseIngredientPanel);
    }, 
    handleCloseIngredientPanel: function() {
        const panels = document.querySelectorAll('.elements.active');

        for(const panel of panels) {
            panel.classList.remove('active');
        }
    },
    // Select an ingredient by copying a node and populating the slots in sandwich.js object
    handleSelectIngredient: function(event) {
        event.stopPropagation();
        const ingredient  = event.target.closest('.ingredient');
        const select = ingredient.closest('.select');
        const slot = select.querySelector('.ing_content');
        const selected = ingredient.cloneNode(true);
        slot.innerHTML = '';
        slot.appendChild(selected);
        sandwich.selectedIngredients[select.dataset.slot] = ingredient.dataset.name;
        handlers.handleCloseIngredientPanel();
        code.codeTooltips();
    }
}

export default handlers;
