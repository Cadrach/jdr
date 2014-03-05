var Decorator_Feature_D20Skill = Decorator_Feature.extend({
    getSkillPoints: function(){
        return this.sheet.config.features[this.id].skillPoints ? this.sheet.config.features[this.id].skillPoints:0;
    },

    getValue: function(){
        return Number(this.sheet.getFeatureFromCode(this.config.basedOnFeature).score()) + this.getSkillPoints();
    }
});