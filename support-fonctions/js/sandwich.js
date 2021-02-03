import app from "./app.js";

const sandwich = {
    breads: ['mie', 'baguette', 'burger'],
    ingredients: ['fromage', 'tomate', 'salade', 'jambon', 'steak'],
    selectedIngredients: {
        bread: '',
        ing1: '',
        ing2: '',
    },
    make: function(){

        let generatedSandwich, tooltipMessage;
        
        // Customizable sandwich \o/
        if(app.settings.parameter) {
            let empty = 0;
            // Check for empty slots
            for(let ingredient in sandwich.selectedIngredients) {
                if(!sandwich.selectedIngredients[ingredient]) {
                    app.errorOnIngredient(ingredient);
                    empty++;
                }
            }

            if(empty) {
                return;
            }

            sandwich.animateIngredients();

            generatedSandwich = sandwich.generate(sandwich.selectedIngredients.bread, sandwich.selectedIngredients.ing1, sandwich.selectedIngredients.ing2);
        }
        // Same sandwich for everyone :(
        else {
            generatedSandwich = sandwich.generate('mie', 'fromage', 'jambon');
        }
        // The sandwich may come out of the machine
        if(app.settings.return) {
            // Is there a plate to receive the sandwich ?
            if(app.settings.variable) {
                const plate = document.querySelector('.plate_container');
                plate.prepend(generatedSandwich);
                app.punctualClass(generatedSandwich, 'animate__bounceInDown');
                tooltipMessage = "Grâce au 'return', le sandwich peut sortir de la machine pour être récupéré par une assiette (variable)";
            }
            // The sandwich falls for ever
            else {
                const plate = document.querySelector('.plate_container');
                generatedSandwich.classList.add('fall');
                plate.prepend(generatedSandwich);
                
            }
        } 
        // The sandwich is stuck inside the machine
        else {
            const stuckContainer = document.querySelector('.stuck');
            app.punctualClass(generatedSandwich, 'animate__slideInDown');
            stuckContainer.appendChild(generatedSandwich);
            tooltipMessage = "Le sandwich reste coincé dans la machine !";
        }
        tippy(generatedSandwich, {
            content: tooltipMessage,
        });
    },
    // Create a tasty HTML sandwich
    generate: function(bread, ing1, ing2) {
        let sandwichElement = document.createElement('div');
        sandwichElement.className = 'animate__animated sandwich ' + bread;
        sandwichElement.appendChild(sandwich.createSlice(bread + '_haut'));
        sandwichElement.appendChild(sandwich.createSlice(ing1));
        sandwichElement.appendChild(sandwich.createSlice(ing2));
        sandwichElement.appendChild(sandwich.createSlice(bread + '_bas'));

        return sandwichElement;
    },
    createSlice: function(name) {
        let slice = document.createElement('div');
        slice.className = "slice "+ name;
        return slice;
    },
    // Create a "ghost" ingredient to animate then delete it
    animateIngredients: function() {
        const containers = document.querySelectorAll('.ing_content');
        for(let container of containers) {
            const ingredient = container.querySelector('.ingredient');
            let copy = ingredient.cloneNode(true);
            copy.classList.add('ghost-ingredient');
            container.appendChild(copy);
            setTimeout(() => {
                container.removeChild(copy);
            }, 1000);
        }
    },
    wipe: function(){
        const servedSandwich = document.querySelector('.plate_container .sandwich');
        if(servedSandwich) {
            app.punctualClass(servedSandwich, 'animate__bounceOutRight');
            setTimeout(() => {
                servedSandwich.remove();
                
            }, 500);
        } 

        const stuckSandwich = document.querySelector('.stuck .sandwich');
        if(stuckSandwich) {
            app.punctualClass(stuckSandwich, 'animate__bounceOutRight');
            setTimeout(() => {
                stuckSandwich.remove();
            }, 500);
        }
    }
}

export default sandwich;