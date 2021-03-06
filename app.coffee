audio = ''
angular.module 'app', ['ui.router','ngSanitize']

.config ['$urlRouterProvider', '$stateProvider', ($urlRouterProvider, $stateProvider)->
	$urlRouterProvider.otherwise('/')
	$stateProvider
	.state 'home',
		url: '/',
		templateUrl: 'artist.html',
		controller: 'musicContr'
	.state 'home.artist',
		url: 'find/:artist',
		controller: ['$scope', '$stateParams', ($scope, $stateParams)->
			$scope.search $stateParams.artist
			return]
	return
]

.controller 'musicContr', ['$scope', '$state', '$sce', ($scope, $state, $sce) ->
	$scope.songs = []
	$scope.stream = ""
	$scope.arts = []
	$scope.imgs = []

	audiojs.events.ready ()-> 
		as = audiojs.createAll()
		return

	$scope.search = (art)->
		$scope.artist = art
		window.location.hash='#/find/' + $scope.artist
		url = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + art + '&api_key=a75bd15e529625f1fcc5eff85ddb2c05&format=json'
		jsonArr = JSON.parse(httpGet(url))
		sim = jsonArr.artist.similar.artist
		$scope.arts = get_sim_name(sim)
		$scope.imgs = get_imgs(sim)
		
		url_top_artist = 'http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=' + art + '&api_key=a75bd15e529625f1fcc5eff85ddb2c05&format=json'
		top_artist = JSON.parse(httpGet(url_top_artist))
		$scope.songs = top_artist.toptracks.track
		return

	$scope.searchSongs = ()->
		art = corrector $scope.artist
		$scope.search(art)
		return

	$scope.play = (who, what, id)->
		$(".active").removeClass("active")
		this.sel = id
		track = who + ' - ' + what
		track = track.split(' ').join('%20')
		track_url = 'http://ex.fm/api/v3/song/search/' + track + '?start=0&results=1'
		track_json = JSON.parse(httpGet(track_url))
		stream = track_json.songs[0]['url']
		if stream.indexOf('api.soundcloud.com') != -1
			stream += sc_api_key

		$("#stream").attr("src", stream).trigger("play")
		return
	return
	]