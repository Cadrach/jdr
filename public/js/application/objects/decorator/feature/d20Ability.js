var Decorator_Feature_D20Ability = Decorator_Feature.extend({
    score: function(){
        var value = this.getValue();
        return value ? ((value - 10) >= 0 ? '+':'') + Math.floor((value - 10) / 2):'';
    }
});