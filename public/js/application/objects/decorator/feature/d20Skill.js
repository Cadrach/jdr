var Decorator_Feature_D20Skill = Decorator_Feature.extend({
    getSkillPoints: function(){
        return this.sheet.config.features[this.id].skillPoints ? this.sheet.config.features[this.id].skillPoints:0;
    },

    getValue: function(){
        var score = this.config.basedOnFeature ? Number(this.sheet.getFeatureFromCode(this.config.basedOnFeature).score()):0;
        return score + this.getSkillPoints();
    }
});