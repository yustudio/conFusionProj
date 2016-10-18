'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;

            //$scope.dishes= menuFactory.getDishes();

            $scope.showMenu = false;
            $scope.message = "Loading ...";
            $scope.dishes= {};
            menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
            // .then(
            //     function(response) {
            //         $scope.dishes = response.data;
            //         $scope.showMenu = true;
            //     },
            //     function(response) {
            //         $scope.message = "Error: "+response.status + " " + response.statusText;
            //     }
            // );
                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', function($scope) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

//            var dish= menuFactory.getDish(parseInt($stateParams.id,10));
//            
//            $scope.dish = dish;
            
            $scope.dish = {};
            $scope.showDish = false;
            $scope.message="Loading ...";
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                function(response){
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );

            // menuFactory.getDish(parseInt($stateParams.id,10))
            // .then(
            //     function(response){
            //         $scope.dish = response.data;
            //         $scope.showDish=true;
            //     },
            //     function(response) {
            //         $scope.message = "Error: "+response.status + " " + response.statusText;
            //     }
            // );
            
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                
                $scope.dish.comments.push($scope.mycomment);

                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                
                $scope.commentForm.$setPristine();
                
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            }
        }])

        .controller('IndexController', ['$scope', 'corporateFactory', 'menuFactory', function($scope, corporateFactory, menuFactory){
            
            //var featuredish = menuFactory.getDish(0);
            $scope.featuredish = {};

            $scope.showDish = false;
            $scope.message="Loading ...";

            menuFactory.getDishes().get({id:0})
                .$promise.then(
                    function(response){
                        $scope.featuredish = response;
                        $scope.showDish = true;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
                );
            //menuFactory.getDish(0)
            // .then(
            //     function(response){
            //         $scope.featuredish = response.data;
            //         $scope.showDish = true;
            //     },
            //     function(response) {
            //         $scope.message = "Error: "+response.status + " " + response.statusText;
            //     }
            // );
            //var promotion = menuFactory.getPromotion(0);
            $scope.showPromoted = false;
            $scope.messagePromotion="Loading ...";
            menuFactory.getPromotion().get({id:0})
                .$promise.then(
                    function(response){
                        $scope.promotion = response;
                        $scope.showPromoted = true;
                    },
                    function(response) {
                        $scope.messagePromotion = "Error: "+response.status + " " + response.statusText;
                    }
                );

            $scope.showChef = false;
            $scope.messageChef="Loading ...";
            menuFactory.getLeaders().get({id:3})
                .$promise.then(
                    function(response){
                        $scope.executivechef = response;
                        $scope.showChef = true;
                    },
                    function(response) {
                        $scope.messageChef = "Error: "+response.status + " " + response.statusText;
                    }
                );

           //var executivechef = corporateFactory.getLeader(3);
            //$scope.promotion = promotion;
            //$scope.featuredish = featuredish;
            //$scope.executivechef = executivechef;
        }])

        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory){
            
            $scope.leaders = corporateFactory.getLeaders();
        }]);

;
