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