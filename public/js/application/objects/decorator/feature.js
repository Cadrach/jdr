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
        return this.sheet.config.features[this.id].value;
    },

    /**
     * Return config
     * @returns {*}
     */
    getConfig: function(){
        return this.sheet.config.features[this.id];
    }
});