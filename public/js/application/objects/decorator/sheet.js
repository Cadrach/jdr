var Decorator_Sheet = Decorator.extend({
    init: function(data){
        //Call parent function
        this._super(data);

        //Create default config if not existing
        if( ! this.config || ! this.config.features)
        {
            this.config = {
                features: {

                }
            }
        }

        //Decorate features
        this.shortcuts = {};
        this.sheetModel.groups.forEach(function(group){
            group.features.forEach(function(feature, key){
                //Decorate the feature
                group.features[key] = new window[feature.featureModel.decoratorClass](feature, this);

                //Create shortcut if a code is present
                if(feature.code)
                {
                    //If code already present, raise an error, cannot have duplicate
                    if(this.shortcuts[feature.code])
                    {
                        throw "Feature code [" + feature.code + "] already used for this sheet.";
                    }

                    //Add a shortcut to the sheet for this feature, used by calculated features
                    this.shortcuts[feature.code] = group.features[key];
                }

                //Create config object if none present
                if( ! this.config.features[feature.id])
                {
                    this.config.features[feature.id] = {};
                }
            }, this);
        }, this);
    },

    getFeatureFromCode: function(code){
        if( ! this.shortcuts[code])
        {
            throw "No shortcut '"+code+"' for this sheet.";
        }
        return this.shortcuts[code]
    }
});