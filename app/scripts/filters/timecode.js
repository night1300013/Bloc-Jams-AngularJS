(function(){
    function timecode(SongPlayer) {
        return function(seconds) {
            var seconds = Number.parseFloat(seconds);

            if (Number.isNaN(seconds)) {
              return "-:--";
            }

/*            var wholeSeconds = Math.floor(seconds);
            var mintues = Math.floor(wholeSeconds / 60);
            var remainingSeconds = wholeSeconds % 60;

            var output = mintues + ":";

            if (remainingSeconds < 10) {
                  output += "0";
            }

            output += remainingSeconds;
*/
            output = SongPlayer.getTimer(seconds);

            return output;
        };
    }

    angular
        .module('blocJams')
        .filter('timecode', ['SongPlayer', timecode]);
})();
