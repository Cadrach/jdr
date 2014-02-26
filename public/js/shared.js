/**
 * Functions defined in the closure can be used bot client & server side
 */
(function(exports){

    exports.test = function(){
        return 'Testing shared function "TEST"';
    }

    exports.feature = {
        d20:{
            /**
             * Returns ability score from a D20 ability
             * @param value
             * @returns {string}
             */
            abilityScore: function(value){
                return value ? ((value - 10) >= 0 ? '+':'') + Math.floor((value - 10) / 2):'';
            }
        }
    };

})(typeof exports === 'undefined'? this['sharedMethods']={}: exports);