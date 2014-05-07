sel = 0
sc_api_key='?client_id=0557caec313ae36a9d6a21841293da11'

httpGet = (theUrl)->
	xmlHttp = null
	xmlHttp = new XMLHttpRequest()
	xmlHttp.open('GET', theUrl, false)
	xmlHttp.send(null)
	xmlHttp.responseText

squerify  = (img)->
	img.replace('/252/','/126s/')

get_sim_name = (sim)->
	arts = []
	arts.push(sim[0].name)
	arts.push(sim[1].name)
	arts.push(sim[2].name)
	arts.push(sim[3].name)
	arts.push(sim[4].name)
	arts

get_imgs = (sim)->
	imgs= []
	imgs.push(squerify(sim[0].image[3]['#text']))
	imgs.push(squerify(sim[1].image[3]['#text']))
	imgs.push(squerify(sim[2].image[3]['#text']))
	imgs.push(squerify(sim[3].image[3]['#text']))
	imgs.push(squerify(sim[4].image[3]['#text']))
	imgs

corrector = (str)->
	url = 'http://ws.audioscrobbler.com/2.0/?method=artist.getcorrection&artist='+str+'&api_key=a75bd15e529625f1fcc5eff85ddb2c05&format=json'
	jsonArr = JSON.parse(httpGet(url))
	try
		ans = jsonArr.corrections.correction.artist.name
	catch e
		ans = str
	ans
	