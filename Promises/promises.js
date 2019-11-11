function getMostFollowers(...usernames) {
  let baseUrl = 'https://api.github.com/users/';
  let urls = usernames.map(username => $.getJSON(baseUrl + username));
  return Promise.all(urls).then(function(data) {
    let max = data.sort((a,b) => a.followers < b.followers)[0];
    return `${max.nam} has the most followers with ${max.followers}`;
  })
}

function starWarsString(id) {
  var str = '';
  return $.getJSON(`https://swapi.co/api/people/${id}`).then (function(res) {
    str += `${res.name} is featured in `;
    let filmData = res.films[0];
    return $.getJSON(filmData);
  }).then(function (res) {
    str += `${res.title}, directed by ${res.director} `;
    let planetData = res.planets[0];
    return $.getJSON(planetData);
  }).then(function(res) {
    str += `and it takes place on ${res.name}`;
    return str;
  }).then(function(finalString) {
    return finalString;
  });
}