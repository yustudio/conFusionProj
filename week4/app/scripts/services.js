'use strict';

angular.module('confusionApp')
        .constant("baseURL","http://localhost:3000/")
        .service('menuFactory', ['$resource', '$http','baseURL',function($resource,$http,baseURL) {
    
                //this.getDishes = function(){
                    
                    //return dishes;
                    
                    //return $http.get(baseURL+"dishes");  // returns a promise

                this.getDishes = function(){
                    return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
                };
                
                // this.getDish = function (index) {
                    
                //     //return dishes[index];
                //      return $http.get(baseURL+"dishes/"+index);
                // };
    
                this.getPromotion = function() {
                  //return promotions[index];
                  //return $resource(baseURL+"dishes/"+index, null, {'update'})
                  return $resource(baseURL+"promotions/:id",null,  {'update':{method:'PUT' }});
                };    
                        
        }])

        .factory('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    
            var corpfac = {};
    
            corpfac.getLeaders = function(){
              //return leadership;

              return $resource(baseURL+"leadership/:id",null,  {'update':{method:'PUT' }});
            };

            // corpfac.getLeader = function(index) {
            //   return leadership[index];
            // };

            return corpfac;    
    
        }])

         .factory('feedbackFactory', [ '$resource', 'baseURL', function($resource,baseURL) {

            var feedfac = {};
        
            feedfac.getFeedback = function(){
               return $resource(baseURL+"feedback/:id",null, {'update':{method:'PUT'}});
            };
            return feedfac;

          }])


        ;
