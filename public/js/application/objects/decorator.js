var Decorator = Class.extend({
    init: function(data){
        angular.forEach(data, function(value, key){
            this[key] = value;
        }, this)
    }
});