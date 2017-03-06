randomNumbers.controller('soundController', [ '$scope', '$interval', '$http', '$location', '$window', '$parse' ,function($scope, $interval, $http, $location, $window, $parse) {

    $scope.errorBitMap = false;

    var getRandomNumbersUrl = __env.randomApiUrl + "num=10000" + 
                                                "&min=0" + 
                                                "&max=255" + 
                                                "&col=1" + 
                                                "&base=10" + 
                                                "&format=plain" + 
                                                "&rnd=new";

    $scope.loadSound = function() {
      console.log("called");
        $http({
            method: 'GET',
            url: getRandomNumbersUrl,
        }).then(function successCallback(response) {
            var arr = response.data.split(/\n/);
            $scope.whiteSound(arr);
        }, function errorCallback(err) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            $scope.failure = true;
            if (err.status === 503){
                $scope.failureMessage = "Exceeded daily limit for Rnadom.ORG api....Please try after 24 Hours...!";
            } else {
                $scope.failureMessage = "Error getting Rnadom Numbers from the server....Please try after some time...!";    
            }
        });
    }

    $scope.loadSound();

    $scope.scrollTo = function(element) {
      $( 'html, body').animate({
        scrollTop: $(element).offset().top
      }, 2000);
    };

    $scope.whiteSound = function (arr) {

        console.log("white sound");
        var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        var button = document.getElementById('button');

        // Stereo
        var channels = 2;
        // Create an empty two second stereo buffer at the
        // sample rate of the AudioContext
        var frameCount = audioCtx.sampleRate * 3.0;

        var myAudioBuffer = audioCtx.createBuffer(channels, frameCount, audioCtx.sampleRate);
        var a = arr;
        button.onclick = function() {
          // Fill the buffer with white noise;
          //just random values between -1.0 and 1.0
          for (var channel = 0; channel < channels; channel++) {
           // This gives us the actual ArrayBuffer that contains the data
           var nowBuffering = myAudioBuffer.getChannelData(channel);
           for (var i = 0; i < frameCount; i++) {
             // Math.random() is in [0; 1.0]
             // audio needs to be in [-1.0; 1.0]
             var j = i % 10000;
             nowBuffering[i] = a[j] * 0.256- 1;
           }
          }

          // Get an AudioBufferSourceNode.
          // This is the AudioNode to use when we want to play an AudioBuffer
          var source = audioCtx.createBufferSource();
          // set the buffer in the AudioBufferSourceNode
          source.buffer = myAudioBuffer;
          // connect the AudioBufferSourceNode to the
          // destination so we can hear the sound
          source.connect(audioCtx.destination);
          // start the source playing
          source.start();
        }
    };

}]);
