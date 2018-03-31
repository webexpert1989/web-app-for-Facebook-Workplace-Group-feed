/****************************
 * Main Controller
 */

(function() {
	"use strict";

	angular.module("FF.controller", []).controller("feed", ["$scope", "$api", "$feed", function($scope, $api, $feed) {

		// get feed data and apply new $scope
		$api.getFeed($scope, function(response) {
			$scope.feedData = $feed.parseData(response);
		});

	}]);
})();
