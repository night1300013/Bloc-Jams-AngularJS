(function() {
    function SongPlayer(){
      /**
      * desc: songplayer service
      * type: {Object}
      **/
      var SongPlayer = {};
      /**
      * desc: current playing song
      * type: {Object}
      **/
      var currentSong = null;
      /**
      * desc: Buzz Object audio file
      * type: {Object}
      **/
      var currentBuzzObject = null;

      /**
      * function: setSong
      * desc: Stops currenly playing song and loads new audio file as currentBuzzObject
      * param: {Object} song
      */
      var setSong = function(song) {
          if (currentBuzzObject) {
            currentBuzzObject.stop();
            currentSong.playing = null;
          }

          currentBuzzObject = new buzz.sound(song.audioUrl, {
              formats: ['mp3'],
              preload: true
          });
          currentSong = song;
      };
      /**
      * function: playSong
      * desc: Plays song and set variable 'playing' to true
      * param: {Object} song
      */
      var playSong = function(song) {
          currentBuzzObject.play();
          song.playing = true;
      }
      /**
      * function: play
      * desc: Starts or restarts song if it's not currently playing
      * param: {Object} song
      */
      SongPlayer.play = function(song) {
          if (currentSong !== song) {
            setSong(song);
            playSong(song);
          } else if (currentSong === song) {
              if (currentBuzzObject.isPaused()) {
                  playSong(song);
              }
          }
      };
      /**
      * function: pause
      * desc: pauses song and set variable 'playing' to false
      * param: {Object} song
      */
      SongPlayer.pause = function(song) {
        currentBuzzObject.pause();
        song.playing = false;
      };

      return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
