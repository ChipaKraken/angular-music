var sel = 0;
var scr = false;
var audio = '';
var sc_api_key='?client_id=0557caec313ae36a9d6a21841293da11';

function musicContr($scope) {
  $scope.songs = [];
  $scope.arts = [];
  $scope.imgs = [];
  $scope.search = function (art) {
    $scope.artist = art;
    var url = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + art + '&api_key=a75bd15e529625f1fcc5eff85ddb2c05&format=json';
    var jsonArr = JSON.parse(httpGet(url));
    var sim = jsonArr.artist.similar.artist;
    $scope.arts = get_sim_name(sim);
    $scope.imgs = get_imgs(sim);
    
    var url_top_artist = 'http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=' + art + '&api_key=a75bd15e529625f1fcc5eff85ddb2c05&format=json';
    var top_artist = JSON.parse(httpGet(url_top_artist));
    $scope.songs = top_artist.toptracks.track;
  };
  $scope.searchSongs = function() {
    var art = $scope.artist;
    $scope.search(art);
  };
  $scope.play = function (who, what, id) {
    if (audio === '') {
      audio = '';
    } else {
      audio.pause();
    }
    $('.act').removeClass();
    this.sel = id;
    track = who + ' - ' + what;
    track = track.replace(/ /g, '%20');
    var track_url = 'http://ex.fm/api/v3/song/search/' + track + '?start=0&results=1';
    var track_json = JSON.parse(httpGet(track_url));
    var stream = track_json.songs[0]['url'];
    if (stream.indexOf('api.soundcloud.com') != -1) {
      stream += sc_api_key;
    }
    audio = new Audio(stream);
    audio.play();
    if (scr) {
      $.post('cgi-bin/scr.py', {
        'username': username,
        'password':password,
        'artist':who,
        'title':what
      }); 
    }
  };
}
