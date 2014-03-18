angular.module('jdrUpdater', []);

//Updater service
angular.module('jdrUpdater')
    .factory('jdrUpdater', function($parse, $http, $injector){

        return{
            update: function(targetString, scope){
                //Item name & value
                var itemName = targetString.split('.').slice(0, -1).join('.');

                //Getter for the object containing the value passed to ngModel
                var attrName = targetString.split('.').pop();
                var getterItem = $parse(itemName);

                //Get item from current scope
                var item = getterItem(scope);

                //If not found try from parent scope
                if( ! item)
                {
                    item = getterItem(scope.$parent);
                }

                try{
                    var service = $injector.get(itemName.toProperCase());
                } catch(e) {
                    throw 'Unable to read string "' + updaterString + '"' + "\n" + e;
                }
                var data = {};
                data[attrName] = item[attrName];
                console.log('SAVING ', data);
                service.prototype$updateAttributes({id: item.id}, data);
            }
        }
    });

//Updater directive
angular.module('jdrUpdater')
    .directive('jdrUpdater', function($parse, $http, $timeout, $injector, jdrUpdater, promiseTracker){

        function link(scope, element, attrs, ngModel) {

            var updaterString = (attrs.jdrUpdater || attrs.ngModel);
            var lastValue = null;

            //On focus, store value
            element.bind('focus', function(){
                lastValue = ngModel.$modelValue;
            });

            var update = function() {
                //Do something only if value changed
                if(ngModel.$modelValue !== lastValue)
                {
                    jdrUpdater.update(updaterString, scope);
                }
            };

            //Observe changes
            if(attrs.datepickerPopup || attrs.datePicker || (attrs.ngOptions && !attrs.selectize) || element[0].type == 'checkbox')
            {
                //For date time, observe view changes
                ngModel.$viewChangeListeners.push(update);
            }
            else
            {
                //On blur, launch update
                element.bind('blur', update);
            }

        }

        return {
            restrict: 'A',
            require: 'ngModel',
            link: link
        }
    });