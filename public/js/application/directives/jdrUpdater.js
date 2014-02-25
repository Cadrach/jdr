module.directive('jdrUpdater', function($parse, $http, $timeout, $injector, promiseTracker){

        function link(scope, element, attrs, ngModel) {

            //Item name & value
            var itemName = (attrs.jdrUpdater || attrs.ngModel).split('.').slice(0, -1).join('.');
            var lastValue = null;

            //Getter for the object containing the value passed to ngModel
            var attrName = (attrs.jdrUpdater || attrs.ngModel).split('.').pop();
            var getterItem = $parse(itemName);

            //On focus, store value
            element.bind('focus', function(){
                lastValue = ngModel.$modelValue;
            });

            var update = function() {
                //Do something only if value changed
                if(ngModel.$modelValue !== lastValue)
                {
                    //Get item from current scope
                    var item = getterItem(scope);

                    //If not found try from parent scope
                    if( ! item)
                    {
                        item = getterItem(scope.$parent);
                    }

                    var service = $injector.get(itemName.toProperCase());
                    var data = {};
                    data[attrName] = item[attrName];
                    service.prototype$updateAttributes({id: item.id}, data);
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