var Decorator_Feature = Decorator.extend({
    init: function(data, sheet){
        //Call parent function
        this._super(data);

        //Store sheet, since it holds all information of configuration for the features
        this.sheet = sheet;
    },

    /**
     * Returns feature value
     */
    getValue: function(){
        return this.sheet.config.features[this.id].value + this.getModifierSum();
    },

    getModifierSum: function(){
        var total = 0;
        if(this.getConfig().modifiers)
        {
            this.getConfig().modifiers.forEach(function(mod){
                var n = Number(mod.value);
                total+= isNaN(n) ? 0:n;
            });
        }
        return total;
    },

    /**
     * Return config
     * @returns {*}
     */
    getConfig: function(){
        return this.sheet.config.features[this.id];
    }
});