angular.module('application').directive('jdrBoard', function(){

        function controller ($scope, $timeout, $routeParams, jdrSocket, Game){

            var gameSocket = jdrSocket('/game');

            $scope.board = {
                inputManual: ''
            };

            $scope.send = function(){
                if($scope.board.inputManual)
                {
                    Game.sendMessage({
                        gameId: $scope.game.id,
                        content: {
                            text: $scope.board.inputManual
                        }
                    });
                    $scope.board.inputManual = '';
                }
            }

            /**
             * Join game chat
             */
            $scope.join = function(){
                //On success, connect to the game room
                if($scope.game.id)
                {
                    gameSocket.emit('joinGame', $scope.game.id);
                    $scope.scrollBottom(true);
                }
            }

            /**
             * Scroll to bottom of message list, if we were already at the bottom
             * @param force - will scroll regardless of current scroll position
             */
            $scope.scrollBottom = function(force){
                var e = $scope.element.messageList;
                var size = e.prop('scrollHeight');
                var position = e.prop('scrollTop') + e.height();
                if(position >= size || force)
                {
                    //Scroll to bottom of message list
                    $timeout(function(){
                        e.scrollTop(size);
                    })
                }
            }

            gameSocket.on('newMessage', function(data){
                $scope.scrollBottom();
                $scope.game.messages.push(data);
            });

            //On connection try to join the chat
            gameSocket.on('connect', function(){
                $scope.join();
            })

            //On game changes join the chat
            $scope.$watch('$routeParams.gameId', function(){
                $scope.join();
            });
        }

        function link(scope, element, attrs) {

            //Element used by the controller to instanciate the popover
            scope.element = {
                messageList: element.children('.message-list')
            };
        }

        return {
            restrict: 'E',
            require: 'ngModel',
            scope: {
                game: '=ngModel'
            },
            transclude: true,
            link: link,
            controller: controller,
            templateUrl: 'templates/directives/jdr-board.html'
        }
});