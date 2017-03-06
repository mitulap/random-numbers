randomNumbers.controller('mainAppController', [ '$scope', '$interval', '$http', '$location',     '$window', '$parse' ,function($scope, $interval, $http, $location, $window, $parse) {

    $scope.errorBitMap = false;

    var getRandomNumbersUrl = __env.randomApiUrl + "num=10000" + 
                                                "&min=0" + 
                                                "&max=255" + 
                                                "&col=1" + 
                                                "&base=10" + 
                                                "&format=plain" + 
                                                "&rnd=new";

    $scope.loadBitMap = function() {
        $http({
            method: 'GET',
            url: getRandomNumbersUrl,
        }).then(function successCallback(response) {
            var arr = response.data.split(/\n/);

            var bitMapDiv = angular.element( document.querySelector( '#bitmap' ) );
            bitMapDiv.html('');
            bitMapDiv.append($scope.drawBitMap(arr, 32));  

        }, function errorCallback(err) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $scope.failure = true;
            console.log(err);

            if (err.status === 503){
                $scope.failureMessage = "Exceeded daily limit for Rnadom.ORG api....Please try after 24 Hours...!";
            } else {
                $scope.failureMessage = "Error getting Rnadom Numbers from the server....Please try after some time...!";    
            }
        });
    }

    $scope.loadBitMap();

    $scope.homePage = function () {
        $window.location.reload();
        $window.location.href = "/#/";
    };

    $scope.scrollTo = function(element) {
      $( 'html, body').animate({
        scrollTop: $(element).offset().top
      }, 2000);
    };



    $scope.drawBitMap = function (arr, depth) {
        var offset, height, data, image;

        function conv(size) {
            return String.fromCharCode(size&0xff, (size>>8)&0xff, (size>>16)&0xff, (size>>24)&0xff);
        }

        offset = depth <= 8 ? 54 + Math.pow(2, depth)*4 : 54;
        height = Math.ceil(Math.sqrt(arr.length * 8/depth));

        //BMP Header
        data  = 'BM';                          // ID field
        data += conv(offset + arr.length);     // BMP size
        data += conv(0);                       // unused
        data += conv(offset);                  // pixel data offset

        //DIB Header
        data += conv(40);                      // DIB header length
        data += conv(height);                  // image height
        data += conv(height);                  // image width
        data += String.fromCharCode(1, 0);     // colour panes
        data += String.fromCharCode(depth, 0); // bits per pixel
        data += conv(0);                       // compression method
        data += conv(arr.length);              // size of the raw data
        data += conv(2835);                    // horizontal print resolution
        data += conv(2835);                    // vertical print resolution
        data += conv(0);                       // colour palette, 0 == 2^n
        data += conv(0);                       // important colours

        //Grayscale tables for bit depths <= 8
        if (depth <= 8) {
            data += conv(0);

            for (var s = Math.floor(255/(Math.pow(2, depth)-1)), i = s; i < 256; i += s)  {
              data += conv(i + i*256 + i*65536);//65536
            }
        }

        //Pixel data
        data += String.fromCharCode.apply(String, arr);

        //Image element
        image = document.createElement('img');
        image.width = 128;
        image.height = 128;

        image.src = 'data:image/bmp;base64,' + btoa(data);

        return image;
    }

}]);
