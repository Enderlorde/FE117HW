const Lightbulb = function(){
    this.power = 0;
    this.energyCost = 0;
    this.isToggled = false;
    this.durationOfWork = 0;

    this.create = function (power, energyCost){
        this.power = power;
        this.energyCost = energyCost;
        this.isToggled = false;
        this.durationOfWork = 0;
    }

    this.on = function(){
        if (!this.isToggled){
            this.isToggled = true;
            this.timer = setInterval(() => this.durationOfWork++, 1000);
        }
    }

    this.off = function(){
        if (this.isToggled){
            this.isToggled = false;
            clearInterval(this.timer);
        }
    }

    this.getTotalEnergyCost = function(){
        return this.durationOfWork*this.energyCost;
    }

    this.getDurationOfWork = function(){
        return this.durationOfWork;
    }
}

const SmartLightbulb = function(){
    Lightbulb.apply(this);

    this.on = function(){
        if (!this.isToggled){
            this.isToggled = true;
            this.timer = setInterval(() => {
                this.durationOfWork++;
                console.log(this.durationOfWork);
                if (this.durationOfWork > 10) {
                    this.off();
                    console.log('that was very smart');
                };
            }, 1000);
        }
    }
}

let bb = new SmartLightbulb();


const LazyUI = function(){
    this.create = function(tagName){
        return document.createElement(tagName);
    }

    this.attr = function(element, name, value){
        element.setAttribute(name, value);
    }

    this.html = function(element, value=''){
        if(value.length > 0){
            element.innerHTML = value;
        }else{
            return element.innerHTML;
        };
    }

    this.search = function(element, selector){
        return element.querySelector(selector);
    }

    this.addClass = function(element, className){
        element.classList.add(className);
    }

    this.removeClass = function(element, className){
        element.classList.remove(className);
    }

    this.toggleClass = function(element, className){
        //Хто я?
    }

    this.hasClass = function(element,  className){
        return element.classList.contain(className);
    }

    this.append = function(element, newElement, beforeElement = null){
        if (beforeElement){
            element.before(newElement);
        }else{
            element.after(newElement);
        }
    }

    this.on = function(element, eventName, funcName){
        element.addEventListener(eventName, (e) => funcName());
    }
}

window.onload = () => { 
    let lz = new LazyUI();
    let prop = lz.create('div');
    lz.addClass(prop,'testClass');
    lz.html(prop, 'Come get some');
    console.log('HTML: ' + lz.html(prop));
    lz.on(prop, 'click', () => {console.log(this, event.target);});
    lz.append(document.body, prop);
};