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