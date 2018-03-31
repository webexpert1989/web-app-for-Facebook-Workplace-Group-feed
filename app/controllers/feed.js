/****************************
 * Main Controller
 */

(function() {
	"use strict";

	angular.module("FF.controller", []).controller("feed", ["$scope", "$api", "$feed", function($scope, $api, $feed) {

		$scope.showSubContent = function(field, feedIndex) {
			if(!$scope.feedData[feedIndex].show) {
				Object.assign($scope.feedData[feedIndex], {
					show: {
						likes   : false,
						comments: false
					}
				});
			}

			if($scope.feedData[feedIndex].show[field] == true) {
				$scope.feedData[feedIndex].show[field] = false;
				return;
			}

			for(let f in $scope.feedData[feedIndex].show) {
				$scope.feedData[feedIndex].show[f] = f == field? true: false;
			}
		}

		// get feed data and apply new $scope
		$api.getFeed($scope, function(response) {
			$scope.feedData = $feed.parseData(response);
		});

	}]);
})();
