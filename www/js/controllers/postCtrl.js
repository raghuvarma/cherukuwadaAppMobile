angular.module('cherukuwadaApp.post', [])
.controller('postCtrl', function($scope, $state, $http, $ionicModal, UserFactory, $stateParams, $rootScope, $timeout) {

	$scope.medicineData = [];
    $scope.userDetails = UserFactory.data;
    $scope.currentUser = UserFactory.currentUser;
    $scope.existingUserDetails = UserFactory.currentUser;
    $scope.show = {};
    $scope.show.posts = true;
    $scope.newComment = {};
    $scope.postObj = $stateParams.postObject;
    $scope.postCommentsData = [];
    $scope.serverPath = 'http://hidden-lake-44952.herokuapp.com/';
    //$scope.serverPath = 'http:localhost:3000/';

    $scope.fnTimer = function() {
        $scope.timer = $timeout(function() {
          $scope.getComments('posts', $scope.postObj.id);
        }, 10000);
      };
      
      $rootScope.$on('$stateChangeStart', function() {
        $timeout.cancel($scope.timer);
      });

    $scope.getComments = function() {
        $scope.updateComments('posts', $scope.postObj.id);        
        $scope.fnTimer();
    };

    $scope.updateComments = function(commentsType, commentsTypeId) {        
        var getCommentsUrl = $scope.serverPath + commentsType + '/' + commentsTypeId + '/comments.json';
        $http({
        method : "GET",
            url : getCommentsUrl
        }).then(function mySucces(response) {
            $scope.postCommentsData = response.data;
        }, function myError(response) {
            console.log(response.statusText);
        });
    }
    $scope.getComments('posts', $scope.postObj.id);
        
    $scope.createComment = function(commentsType, commentsTypeId, commentMessage) {
        var postData = { name: $scope.newComment.name, created_by: $scope.existingUserDetails.name };
        $http({
            url: $scope.serverPath + commentsType + '/' + commentsTypeId + '/comments',
            dataType: 'json',
            method: 'POST',
            data: {comment: postData},
            headers: {
                "Content-Type": "application/json"
            }

        }).success(function(response){
            $scope.createCommentData = response;
            console.log('success response: ', response);
            $scope.updateComments('posts', $scope.postObj.id);
        }).error(function(error){
            console.log('error: ', error);
            $scope.updateComments('posts', $scope.postObj.id);
        });
        $scope.newComment.name = '';
        //$scope.redirectFromCreateComment = true;
        //$scope.updateComments('posts', $scope.postObj.id);
    }

});
