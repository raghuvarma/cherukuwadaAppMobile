angular.module('cherukuwadaApp.registration', [])
.controller('registrationCtrl', function($scope, $state , $http) {
	$scope.createAccount = function(name, Email, Mobile, password, cpassword, address) {
		//if success
		$state.go('login');
		$http({method: 'POST', url: '/someUrl', data:loginObj })
		.then(function successCallback(response) {
			$state.go('login');
		  }, function errorCallback(response) {});
	};
});
