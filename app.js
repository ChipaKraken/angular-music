function httpGet(theUrl) {
  var xmlHttp = null;
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', theUrl, false);
  xmlHttp.send(null);
  return xmlHttp.responseText;
}
function squerify (img) {
  return img.replace('252','126s');
}

var sel = 0;
var scr = false;
var audio = '';

function musicContr($scope) {
  $scope.songs = [];
  $scope.arts = [];
  $scope.imgs = [];
  $scope.search = function (art) {
    var url = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + art + '&api_key=a75bd15e529625f1fcc5eff85ddb2c05&format=json';
    var jsonArr = JSON.parse(httpGet(url));
    var sim = jsonArr.artist.similar.artist;
    $scope.arts = [];
    $scope.imgs = [];
    
    $scope.arts.push(sim[0].name);
    $scope.arts.push(sim[1].name);
    $scope.arts.push(sim[2].name);
    $scope.arts.push(sim[3].name);
    $scope.arts.push(sim[4].name);

    $scope.imgs.push(squerify(sim[0].image[3]['#text']));
    $scope.imgs.push(squerify(sim[1].image[3]['#text']));
    $scope.imgs.push(squerify(sim[2].image[3]['#text']));
    $scope.imgs.push(squerify(sim[3].image[3]['#text']));
    $scope.imgs.push(squerify(sim[4].image[3]['#text']));
    
    var url_top_artist, top_artist, _i, _len, i, track_name;
    url_top_artist = 'http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=' + art + '&api_key=a75bd15e529625f1fcc5eff85ddb2c05&format=json';
    top_artist = JSON.parse(httpGet(url_top_artist));
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
