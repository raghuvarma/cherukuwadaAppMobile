angular.module('cherukuwadaApp.dashboard', [])
.controller('dashboardCtrl', function($scope, $state, $http, $ionicModal, UserFactory) {

	$scope.medicineData = [];
    $scope.userDetails = UserFactory.data;
    $scope.currentUser = UserFactory.currentUser;
    $scope.show = {};
    $scope.show.userDetails = true;
    $scope.show.events = false;
    $scope.show.posts = false;
    $scope.show.eventsDetailed = false;
    $scope.newComment = {};

	$scope.fnShowUsers = function() {	
        $scope.show.userDetails = true;
        $scope.show.events = false;
        $scope.show.posts = false;
        $scope.show.userDetailed = false;
        $scope.show.eventsDetailed = false;
		var currentUser = $scope.currentUser;
        var allUsersData = angular.copy($scope.userDetails);
		if(angular.isObject(currentUser)) {
			$scope.existingUserDetails = currentUser;
			$scope.otherUsersDetails = allUsersData.filter( function(o) {
			  if(o.mobile != currentUser.mobile){
			    return true;
			  }else{
                return false;
              }
			});
		} else {
            alert('Your account is expired. Contact our team');
            $state.go('login');
        }
	};

    $scope.fnShowUsers();

    $scope.fnOpenUserDetailed = function(userObject) {
        $scope.show.userDetails = true;
        $scope.show.events = false;
        $scope.show.posts = false;
        $scope.show.userDetailed = true;
        $scope.show.eventsDetailed = false;
        $scope.selectedUser = userObject;     
    }

    $scope.fnShowEvents = function() {
        $scope.show.userDetails = false;
        $scope.show.events = true;
        $scope.show.posts = false;
        $scope.show.eventsDetailed = false;
        var eventsUrl = 'http://hidden-lake-44952.herokuapp.com/events.json'
        $http({ method : "GET",
            url : eventsUrl
        }).then(function mySucces(response) {
            $scope.eventsData = response.data;
        }, function myError(response) {
            console.log(response.statusText);
        });
    };

    $scope.getEventImage = function(eventObject) {
        var imageSrc = '';        
        if(eventObject) {
            if(eventObject.name.indexOf('Birthday') > -1) {
                imageSrc = '../img/birthday.png';
            } else if(eventObject.name.indexOf('Anniversary') > -1) {
                imageSrc = '../img/marriage_anniversary.png';
            } else if(eventObject.name.indexOf('Marriage') > -1) {
                imageSrc = '../img/marriage.png';
            } else if(eventObject.name.indexOf('Upanayanam') > -1) {
                imageSrc = '../img/upanayanam.png';
            } else {
                imageSrc = '../img/default.png';
            }
            return imageSrc;
        }        
    };

    $scope.fnOpenEventDetailed = function(eventObject) {
        $scope.show.userDetails = false;
        $scope.show.events = true;
        $scope.show.posts = false;
        $scope.show.eventsDetailed = true;
        $scope.selectedEvent = eventObject;     
    };

    $scope.fnShowPosts = function() {
        $scope.show.userDetails = false;
        $scope.show.events = false;
        $scope.show.posts = true;
        $scope.show.eventsDetailed = false;
        $scope.fnLoadPosts();
        $scope.postCommentsData = []     
    };

    $scope.fnLoadPosts = function() {
        var postsUrl = 'http://hidden-lake-44952.herokuapp.com/posts.json'
        $http({
        method : "GET",
            url : postsUrl
        }).then(function mySucces(response) {
            $scope.postsData = response.data;
        }, function myError(response) {
            console.log(response.statusText);
        });
    };

    $scope.fnUpdateEventOn = function(eventObject) {
        if(eventObject && eventObject.event_on) {
            var eventDateInUtcINMs = Date.parse(eventObject.event_on);
            var updatedDate = new Date(eventDateInUtcINMs - 19800000);
            return updatedDate;
        }
    }

    $scope.fnCalculateDaysRemainOrCompletedInWords = function(eventObject) {
        var eventTimeInMs = $scope.fnUpdateEventOn(eventObject);
        var todayInMs = Date.parse(new Date());
        var oneDay = 86400000;
        var timeDiff = eventTimeInMs - todayInMs;
        var daysLeftOrComplete = timeDiff/oneDay;
        if(daysLeftOrComplete > 1) {
            return Math.floor(daysLeftOrComplete) + ' Days Left';
        } else if(daysLeftOrComplete == 1) {
            return Math.floor(daysLeftOrComplete) + ' Days Left';
        } else if(daysLeftOrComplete == 0) {
            var finalDaysRemain = newDaysRemain/(60*60*1000)
            return Math.floor(finalDaysRemain) + ' Hours left.';
        } else if(daysLeftOrComplete == -1) {
            var finalDaysRemain = todayInMs/(60*60*1000)
            return Math.floor(finalDaysRemain) + ' Hours ago.';
        } else {
            daysLeftOrComplete = daysLeftOrComplete * - 1;
            return Math.floor(daysLeftOrComplete) + ' Days Completed';
        }  
    };

    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.fnCreatePost = function(newPost) {
        var postData = { name: newPost.name, body: newPost.body, created_by: $scope.existingUserDetails.name };
        $http({
            url: 'http://hidden-lake-44952.herokuapp.com/posts',
            dataType: 'json',
            method: 'POST',
            data: {post: postData},
            headers: {
                "Content-Type": "application/json"
            }

        }).success(function(response){
            $scope.createPostData = response;
            console.log('success response: ', response);
        }).error(function(error){
            console.log('error: ', error);
        });
        console.log('$scope.createPostData: ', $scope.createPostData);
        newPost.name = '';
        newPost.body = '';
        $scope.modal.hide();
    };

    $scope.getComments = function(commentsType, commentsTypeId) {
        $scope.postCommentsData = [];
        var getCommentsUrl = 'http://hidden-lake-44952.herokuapp.com/' + commentsType + '/' + commentsTypeId + '/comments.json';
        $http({
        method : "GET",
            url : getCommentsUrl
        }).then(function mySucces(response) {
            $scope.postCommentsData = response.data;
        }, function myError(response) {
            console.log(response.statusText);
        });
    }
        
    $scope.createComment = function(commentsType, commentsTypeId, commentMessage) {
        var postData = { name: $scope.newComment.name, created_by: $scope.existingUserDetails.name };
        $http({
            url: 'http://hidden-lake-44952.herokuapp.com/' + commentsType + '/' + commentsTypeId + '/comments',
            dataType: 'json',
            method: 'POST',
            data: {comment: postData},
            headers: {
                "Content-Type": "application/json"
            }

        }).success(function(response){
            $scope.createCommentData = response;
            console.log('success response: ', response);
            $scope.getComments(commentsType, commentsTypeId);
        }).error(function(error){
            console.log('error: ', error);
        });
        $scope.newComment.name = '';
    }

});
