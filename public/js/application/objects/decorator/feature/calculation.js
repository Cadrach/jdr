var Decorator_Feature_Calculation = Decorator.extend({
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
        return new Calculation_Parser(this.config.string, this.sheet).getValue();
    }
});