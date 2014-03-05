var Decorator_Feature_Calculation = Decorator_Feature.extend({
    init: function(data, sheet){
        //Call parent function
        this._super(data);

        //Store sheet, since it holds all information of configuration for the features
        this.sheet = sheet;
    },

    /**
     * Get Parser for the string
     * @returns {Calculation_Parser|*}
     */
    getParser: function(){
        if(! this.parser)
        {
            this.parser = new Calculation_Parser(this.config.string, this.sheet);
        }
        return this.parser;
    },

    /**
     * Returns feature value
     */
    getValue: function(){
        return this.getParser().getValue();
    }
});