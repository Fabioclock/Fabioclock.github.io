import app from "./app.js";
import sandwich from "./sandwich.js";

const code = {
    php: {
        base_top: `<div><span class="func">function</span> <span class="func-name">makeSandwich</span>(<span class="args"></span>) <span class="acc">{</span></div>`,
        base_bottom: `<div><span class="acc">}</span></div>`,
        base_content: `<div class="ind-1 base_content"><span class="var">$sandwich</span> = <span class="icon-mie"></span> + <span class="icon-jambon"></span> + <span class="icon-fromage"></span>;</div>`,
        parameter_content:`<div class="ind-1 base_content"><span class="var">$sandwich</span> = <span class="param" data-slot="bread">$bread</span> + <span class="param"  data-slot="ing1">$ingredient1</span> + <span class="param"  data-slot="ing2">$ingredient2</span>;</div>`,
        return: `<div class="ind-1"><span class="return">return</span> <span class="var">$sandwich</span>;</div>`,
        parameters: `<span class="param" data-slot="bread">$bread</span>, <span class="param" data-slot="ing1">$ingredient1</span>, <span class="param" data-slot="ing2">$ingredient2</span>`,
        plate: `<span class="var">$assiette</span> = `,
    }, 
    js: {
        base_top: `<div><span class="func">function</span> <span class="func-name">makeSandwich</span>(<span class="args"></span>) <span class="acc">{</span></div>`,
        base_bottom: `<div><span class="acc">}</span></div>`,
        base_content: `<div class="ind-1 base_content"><span class="return">let</span> <span class="var">sandwich</span> = <span class="icon-mie"></span> + <span class="icon-jambon"></span> + <span class="icon-fromage"></span>;</div>`,
        parameter_content:`<div class="ind-1 base_content"><span class="return">let</span> <span class="var">sandwich</span> = <span class="param"  data-slot="bread">bread</span> + <span class="param"  data-slot="ing1">ingredient1</span> + <span class="param"  data-slot="ing2">ingredient2</span>;</div>`,
        return: `<div class="ind-1"><span class="return">return</span> <span class="var">sandwich</span>;</div>`,
        parameters: `<span class="param" data-slot="bread">bread</span>, <span class="param" data-slot="ing1">ingredient1</span>, <span class="param" data-slot="ing2">ingredient2</span>`,
        plate: `<span class="return">let</span> <span class="var">assiette</span> = `,

    }, 
    // Property used to save tippy instances in order to get destroyed later
    tippyInstances: [],
    write: function() {
        let currentCode = code[app.currentLanguage.toLowerCase()];
        const container = document.querySelector('.contenu .code');

        container.innerHTML = currentCode.base_top;
        
        if(app.settings.parameter) {
            container.querySelector(".args").innerHTML = currentCode.parameters;
            container.innerHTML += currentCode.parameter_content;
        } else {
            container.innerHTML += currentCode.base_content;
        }        
        if(app.settings.return) {
            container.innerHTML += currentCode.return;
        }
        container.innerHTML += currentCode.base_bottom;

        code.codeTooltips();
    },
    basicTooltips: function() {
        tippy('[data-tippy-content]');
        tippy('.vis',{
            content: "Cliquer pour voir l'intérieur"
        });
        
        tippy('.switch-language',{
            content: "Changer de langage"
        });
        
        tippy('.settings-button',{
            content: "Modifier la fonction"
        });
        
    }, 
    codeTooltips: function() {
        // Remove the exisiting ones
        code.removeTooltips();
        let tempTippy;

        const params = document.querySelectorAll('.param');
        for (let param of params) {
            tempTippy = tippy(param, {
                content: `<div class='tooltip-icon'><span class='icon icon-${sandwich.selectedIngredients[param.dataset.slot]}'></span>${sandwich.selectedIngredients[param.dataset.slot]}</div>`,
                allowHTML: true
            });
            code.tippyInstances.push(tempTippy);
        }
        let leverParams = [];
        for (let ingredient in sandwich.selectedIngredients) {
            leverParams.push(`<span class='icon icon-${sandwich.selectedIngredients[ingredient]}'></span>`);
        }
        let currentCode = code[app.currentLanguage.toLowerCase()];
        let parameters = app.settings.parameter ? leverParams.join(',') : '';
        tempTippy = tippy('.levier', {  
            content: `<div class="code tooltip-code">Exécuter la fonction : <div><span class="func-name">makeSandwich</span>(${parameters});</div></div>`,
            allowHTML: true
        });
        code.tippyInstances.push(tempTippy[0]);
        
        tempTippy = tippy('.plate', { 
            content: `<div class="code tooltip-code">Exécuter la fonction et récupérer son contenu dans une variable : <div>${currentCode.plate} <span class="func-name">makeSandwich</span>(${parameters});</div></div>`,
            allowHTML: true
        })
        code.tippyInstances.push(tempTippy[0]);
    },
    removeTooltips: function() {
        code.tippyInstances.forEach(instance => {
            if(typeof instance.destroy !== "undefined") {
                instance.destroy();
            }
        });
        code.tippyInstances = [];
    }
}


export default code;