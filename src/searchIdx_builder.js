// This code snipped is used to build  
const path = require('path');

var elasticlunr = require('elasticlunr'),
    fs = require('fs');

var idx = elasticlunr(function () {
  this.setRef('id');

  this.addField('title');
  this.addField('tags');
  this.addField('body');
});

fs.readFile(path.join(__dirname,'/JSONs/search_data.json'), function (err, data) {
  if (err) throw err;

  var raw = JSON.parse(data);

  var articles = raw.articles.map(function (a) {
    return {
      id: a._id,
      title: a.title,
      body: a.body,
      tags: a.tags.join(' ')
    };
  });

  articles.forEach(function (article) {
    idx.addDoc(article);
  });

  fs.writeFile(path.join(__dirname,'/JSONs/search_index.json'), JSON.stringify(idx), function (err) {
    if (err) throw err;
    console.log('done');
  });
});
