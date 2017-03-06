randomNumbers.controller('bitMapController', [ '$scope', '$interval', '$http', '$location',     '$window', '$parse' ,function($scope, $interval, $http, $location, $window, $parse) {

    $scope.errorBitMap = false;

    var getRecentPicsUrl = __env.apiUrl + "search/getRecent";
    var addPhotoApiUrl = __env.apiUrl + "album/addPhoto";

    $http({
        method: 'GET',
        url: getRecentPicsUrl,
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.imgList = response.data.photo;
    }, function errorCallback(err) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        $failureHome = true;
        $failureMessage = "Error getting photos from the server....Please try after some time...!";
        
    });

    $scope.homePage = function () {
        $window.location.reload();
        $window.location.href = "/#/";
    };

    $scope.scrollTo = function(element) {
      $( 'html, body').animate({
        scrollTop: $(element).offset().top
      }, 2000);
    };

}]);