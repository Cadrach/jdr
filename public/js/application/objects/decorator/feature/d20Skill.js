var Decorator_Feature_D20Skill = Decorator_Feature.extend({
    getValue: function(){
        return Number(this.sheet.getFeatureFromCode(this.config.basedOnFeature).score()) + this.sheet.config.features[this.id].skillPoints;
    }
});