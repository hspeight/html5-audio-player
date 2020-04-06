Amplitude.init({
  "bindings": {
    37: 'prev',
    39: 'next',
    32: 'play_pause'
  },
  "songs": [{
    "name": "Risin' High (feat Raashan Ahmad)",
    "artist": "Ancient Astronauts",
    "album": "We Are to Answer",
    "url": "./dummy.mp3",
    "cover_art_url": "./alexander-popov-hTv8aaPziOQ-unsplash.jpg"
  }]
});
Amplitude.removeSong(0)
//Amplitude.bindNewElements();

//console.log(Amplitude.init)
Amplitude.addSong({
  "url": "./ASRkn9OEzjA.mp3"
})
Amplitude.bindNewElements();
Amplitude.playSongAtIndex( 0 )
window.onkeydown = function (e) {
  return !(e.keyCode == 32);
};

/*
  Handles a click on the song played progress bar.
*/
document.getElementById('song-played-progress').addEventListener('click', function (e) {
  var offset = this.getBoundingClientRect();
  var x = e.pageX - offset.left;

  Amplitude.setSongPlayedPercentage((parseFloat(x) / parseFloat(this.offsetWidth)) * 100);
});