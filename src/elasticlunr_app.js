require([
  'mustache',
  'elasticlunr',
  'text!article_list.mustache',
  'text!JSONs/search_data.json',
  'text!JSONs/search_index.json'
], function (Mustache, elasticlunr, articleList, data, indexDump) {

  var renderArticleList = function (as) {
    $("#article-list-container")
      .empty()
      .append(Mustache.to_html(articleList, {articles: as}))
  }

  var sampleConfig = {
    "fields": {
        "title": {"boost": 2},
        "body": {"boost": 1},
        "tags": {"boost": 2}
    },
    "boolean": "OR"
  }

  var filterArticleList = function (keyword) {
    if (keyword == "") return 
    var config = sampleConfig; //To use default config 
    var json_config = null;
    if (config != '') {
        json_config = new elasticlunr.Configuration(config, idx.getFields()).get();
    }

    var query = keyword
    var results = null;
    if (json_config == null) {
        results = idx.search(query).map(function (result) {
            return articles.filter(function (a) { return a.id === parseInt(result.ref, 10) })[0]
        })
    } else {
      var count = idx.search(query, json_config).length
      $("#num").text(count + " RESULTS FOUND")
        results = idx.search(query, json_config).map(function (result) {
            return articles.filter(function (a) { return a.id === parseInt(result.ref, 10) })[0]
        })
    }

    renderArticleList(results)
  }
  
  window.profile = function (term) {
    console.profile('search')
    idx.search(term)
    console.profileEnd('search')
  }

  window.search = function (term) {
    console.time('search')
    idx.search(term)
    console.timeEnd('search')
  }

  var indexDump = JSON.parse(indexDump)
  console.time('load')
  window.idx = elasticlunr.Index.load(indexDump)
  console.timeEnd('load')

  var articles = JSON.parse(data).articles.map(function (raw) {
    return {
      id: raw._id,
      title: raw.title,
      body: raw.body,
      tags: raw.tags.join(' '),
      link: raw.link
    }
  })
  
  var debounce = function (fn) {
    var timeout
    return function () {
      var args = Array.prototype.slice.call(arguments),
          ctx = this

      clearTimeout(timeout)
      timeout = setTimeout(function () {
        fn.apply(ctx, args)
      }, 100)
    }
  }

  var searchKW = window.location.href.slice(window.location.href.search('keyword=') + 8)
  debounce(filterArticleList(searchKW))

})
