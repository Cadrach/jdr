var Decorator_Sheet = Decorator.extend({
    init: function(data){
        //Call parent function
        this._super(data);

        //Decorate features
        this.shortcuts = {};
        this.sheetModel.groups.forEach(function(group){
            group.features.forEach(function(feature, key){
                group.features[key] = new window[feature.featureModel.decoratorClass](feature, this);
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
            }, this);
        }, this);

//        //Creating default config
//        var config = {features:{}};
//
//        //Creating shortCut
//        var shortCut = {};
//
//        //Parsing object to fill default config keys
//        sheet.sheetModel.groups.forEach(function(group){
//            group.features.forEach(function(feature){
//                config.features[feature.id] = sheet.config.features[feature.id] ? sheet.config.features[feature.id]:{};
//                if(feature.code)
//                {
//                    //If code already present, raise an error, cannot have duplicate
//                    if(shortCut[feature.code])
//                    {
//                        throw "Feature code [" + feature.code + "] already used for this sheet.";
//                    }
//
//                    //Add a shortcut to the sheet for this feature, used by calculated features
//                    shortCut[feature.code] = {
//                        feature: feature,
//                        config: config.features[feature.id]
//                    };
//                }
//            });
//        });
//
//        //Apply config & shortCut object
//        sheet.config = config;
//        sheet.shortCut = shortCut;
    },

    getFeatureFromCode: function(code){
        return this.shortcuts[code]
    }
});