/****************************
 * Service for App
 * 
 * define ajax callbacks to get json data
 */

(function(){
	"use strict";
	
	angular.module("FF.services", []).constant("$servicesConfig", {
		// feed url
		feedURL: "https://graph.facebook.com/180725895895294/feed?access_token=DQVJ0VXpjSU9YQzBXSXVlU1JIRmc4OXBxcXVDNkdOaGN1ak5KekRwWmlsSmpCWW5VcmwzMlJCTERyWlo3V2lHZA1VHUVJLZAW5tOUdRMXllbGRybUFnaHdsbm9DUUJLaHFPRkpRaVpydm4zcVlrN0JhUWxoWG1HeEYwN3pWZAlN2UERRY0JGeklxdHU0bTNkTHRzSDJwam9Ea1ZAPUDdpdW9haHRkQ0h5UWFuNk5JUUoyN3FBVWFUcF90NUJXaEJaektZAeno3ODVLdUJzWDFlS1VVawZDZD&date_format=U&fields=id,name,story,message,from,created_time,link,actions,picture,type,object_id,full_picture,comments,attachments,likes&method=get&pretty=0&sdk=joey&suppress_http_code=1"		
	})
	.factory("$api", ["$servicesConfig", "$http", function($servicesConfig, $http){
		return {
			
			/**
			 * get feed json
			 * 
			 * @param: $scope, object
			 * @param: success, callback: execute it when ajax calling is worked successfully
			 * @param: faild, callback: execute it when ajax calling is faild
			 * 
			 * @returns: array: parsed array
			 */
			getFeed: function($scope, success, faild){
				$scope.preloader = true;

				$http({
					method  : "GET", 
					url     : $servicesConfig.feedURL, 
					headers : {"Content-Type": "application/json; charset=UTF-8"}
				})
				.then(function(response){
					$scope.preloader = false;

					if(success){
						success(response.data);
					}
				},
				function(err){
					$scope.preloader = false;
					alert("Ajax Error");

					if(faild){
						callback(faild);
					}
				});

				return;
			},
		};
	}]);
	
})();