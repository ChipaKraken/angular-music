function httpGet(theUrl) {
  var xmlHttp = null;
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', theUrl, false);
  xmlHttp.send(null);
  return xmlHttp.responseText;
}
function squerify (img) {
  return img.replace('/252/','/126s/');
}

function get_sim_name (sim) {
  var arts = [];
  arts.push(sim[0].name);
  arts.push(sim[1].name);
  arts.push(sim[2].name);
  arts.push(sim[3].name);
  arts.push(sim[4].name);
  return arts;
}
function get_imgs (sim) {
  var imgs= [];
  imgs.push(squerify(sim[0].image[3]['#text']));
  imgs.push(squerify(sim[1].image[3]['#text']));
  imgs.push(squerify(sim[2].image[3]['#text']));
  imgs.push(squerify(sim[3].image[3]['#text']));
  imgs.push(squerify(sim[4].image[3]['#text']));
  return imgs;
}
function is_cyrillic(str) {
		var checker = 0;
		var url = 'http://ws.audioscrobbler.com/2.0/?method=artist.getcorrection&artist='+str+'&api_key=a75bd15e529625f1fcc5eff85ddb2c05&format=json';
		for(var i=0; i<str.length; i++) {
		if (!(str.charCodeAt(i) < 123)) {
			checker+=1;
		}
		}
		if (checker > 0) {
			var jsonArr = JSON.parse(httpGet(url));
			str = jsonArr.corrections.correction.artist.name;
		};
		return str;
}
