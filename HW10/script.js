const Lightbulb = function(){
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
            clearInterval(this.isToggled);
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

    
}

let bb = new SmartLightbulb();