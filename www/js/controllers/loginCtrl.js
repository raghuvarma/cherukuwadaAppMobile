angular.module('cherukuwadaApp.login', [])
.controller('loginCtrl', function($scope, $state, $http, UserFactory, $filter) {
	$scope.allUsers = UserFactory.data;	$scope.signIn = function(username, password) {	
		$scope.currentUser = $filter('filter')($scope.allUsers, {mobile:username});
		if($scope.currentUser && $scope.currentUser[0] && $scope.currentUser[0].password == password){
			alert('Your successfully login into your application');
			UserFactory.saveCurrentUser($scope.currentUser[0]);
			$state.go('dashboard');
		} else if(!$scope.currentUser[0]) {
			alert('User not found with '+ username + ' . Please, check Your User Name.');
		} else if($scope.currentUser && $scope.currentUser[0] && $scope.currentUser[0].password !== password) {
			alert('Your password is in-correct');
		} else if($scope.currentUser && $scope.currentUser[0] && $scope.currentUser[0].password == password){
			alert('Your successfully login into your application');
		} else {
			alert('Please, enter valid user name and password');
		}
	};
});
