angular.module('cherukuwadaApp.event', [])
.controller('eventCtrl', function($scope, $state, $http, $ionicModal, UserFactory, $stateParams, $rootScope, $timeout) {

	$scope.medicineData = [];
    $scope.userDetails = UserFactory.data;
    $scope.currentUser = UserFactory.currentUser;
    $scope.existingUserDetails = UserFactory.currentUser;
    $scope.show = {};
    $scope.show.events = true;
    $scope.newComment = {};
    $scope.eventObj = $stateParams.eventObject;
    $scope.eventCommentsData = [];
    $scope.serverPath = 'http://hidden-lake-44952.herokuapp.com/';
    //$scope.serverPath = 'http:localhost:3000/';

    $scope.fnTimer = function() {
        $scope.timer = $timeout(function() {
          $scope.getEvents('events', $scope.eventObj.id);
        }, 10000);
      };
      
      $rootScope.$on('$stateChangeStart', function() {
        $timeout.cancel($scope.timer);
      });

    $scope.getEventImage = function(eventObject) {
        var imageSrc = '';        
        if(eventObject) {
            if(eventObject.name.indexOf('Birthday') > -1) {
                imageSrc = 'img/birthday.png';
            } else if(eventObject.name.indexOf('Anniversary') > -1) {
                imageSrc = 'img/marriage_anniversary.png';
            } else if(eventObject.name.indexOf('Marriage') > -1) {
                imageSrc = 'img/marriage.png';
            } else if(eventObject.name.indexOf('Upanayanam') > -1) {
                imageSrc = 'img/upanayanam.png';
            } else {
                imageSrc = 'img/default.png';
            }
            return imageSrc;
        }        
    };

    $scope.fnUpdateEventOn = function(eventObject) {
        if(eventObject) {
            var eventDateInUtcINMs = Date.parse(eventObject);
            var updatedDate = new Date(eventDateInUtcINMs - 19800000);
            return updatedDate;
        } 
    }

    $scope.getEvents = function() {
        $scope.updateComments('events', $scope.eventObj.id);        
        $scope.fnTimer();
    };

    $scope.updateComments = function(commentsType, commentsTypeId) {        
        var getEventsUrl = $scope.serverPath + commentsType + '/' + commentsTypeId + '/comments.json';
        $http({
        method : "GET",
            url : getEventsUrl
        }).then(function mySucces(response) {
            $scope.eventCommentsData = response.data;
        }, function myError(response) {
            console.log(response.statusText);
        });
    }
    $scope.getEvents('events', $scope.eventObj.id);
        
    $scope.createComment = function(commentsType, commentsTypeId, commentMessage) {
        var eventData = { name: $scope.newComment.name, created_by: $scope.existingUserDetails.name };
        $http({
            url: $scope.serverPath + commentsType + '/' + commentsTypeId + '/comments',
            dataType: 'json',
            method: 'POST',
            data: {comment: eventData},
            headers: {
                "Content-Type": "application/json"
            }

        }).success(function(response){
            $scope.createCommentData = response;
            console.log('success response: ', response);
            $scope.updateComments('events', $scope.eventObj.id);
        }).error(function(error){
            console.log('error: ', error);
            $scope.updateComments('events', $scope.eventObj.id);
        });
        $scope.newComment.name = '';
        //$scope.redirectFromCreateComment = true;
        //$scope.updateComments('posts', $scope.postObj.id);
    }

});
