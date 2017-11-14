(function() {
    function SongPlayer(Fixtures){
      /**
      * desc: songplayer service
      * type: {Object}
      **/
      var SongPlayer = {};
      /**
      * desc: current Album
      * type: {Object}
      **/
      var currentAlbum = Fixtures.getAlbum();
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
            stopSong();
          }

          currentBuzzObject = new buzz.sound(song.audioUrl, {
              formats: ['mp3'],
              preload: true
          });
          SongPlayer.currentSong = song;
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
      * function: stopSong
      * desc: Stops song and set variable 'playing' to null
      */
      var stopSong = function() {
          currentBuzzObject.stop();
          SongPlayer.currentSong.playing = null;
      }
      /**
      * function: getSongIndex
      * desc: return index of current song
      * param: {Object} song
      * return: index of song
      */
      var getSongIndex = function(song) {
        return currentAlbum.songs.indexOf(song);
      }
      /**
      * desc: current playing song
      * type: {Object}
      **/
      SongPlayer.currentSong = null;
      /**
      * function: play
      * desc: Starts or restarts song if it's not currently playing
      * param: {Object} song
      */
      SongPlayer.play = function(song) {
          song = song || SongPlayer.currentSong;
          if (SongPlayer.currentSong !== song) {
            setSong(song);
            playSong(song);
          } else if (SongPlayer.currentSong === song && song) {
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
        song = song || SongPlayer.currentSong;
        currentBuzzObject.pause();
        song.playing = false;
      };
      /**
      * function: previous
      * desc: go to previous song if there is one, stop song if no previous song
      */
      SongPlayer.previous = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex--;

          if (currentSongIndex < 0) {
              stopSong();
          } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
          }
      }
      /**
      * function: next
      * desc: go to next song if there is one, stop song if no next song
      */
      SongPlayer.next = function() {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex++;

        if (currentSongIndex > currentAlbum.songs.length-1) {
            stopSong();
        } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
        }
      }

      return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
