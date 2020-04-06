Amplitude.init({
  "bindings": {
    37: 'prev',
    39: 'next',
    32: 'play_pause'
  },
  "songs": [{
    "name": "",
    "artist": "",
    "album": "",
    "url": "./mp3/dummy.mp3",
    "cover_art_url": "./resources/images/alexander-popov-hTv8aaPziOQ-unsplash_small.jpg"
  }]
});

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

function myFunction() {

  var newSong = new Object();

  //get the mp3 to play
  fetch('https://l5u9hr6r1f.execute-api.us-east-1.amazonaws.com/staging/fact')
    .then(res => res.json())
    .then((mp3) => {
      Amplitude.removeSong( 0 )
      newSong.url = mp3.split('~')[0]; //the mp3 to play comesback from the API as a string delimited by '~
      newSong.name = mp3.split('~')[1]; //title
      newSong.artist = mp3.split('~')[2]; //artist
      newSong.cover_art_url = "./resources/images/alexander-popov-hTv8aaPziOQ-unsplash_small.jpg"
      Amplitude.addSong(newSong)
      Amplitude.playNow(newSong)
      console.log('Output: ', mp3);
     // console.log(Amplitude.getRepeat())
    }).catch(err => console.error(err));

}
