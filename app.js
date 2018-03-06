$(document).ready(function(){
 var getUrl = function()
    {
        url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
        'api-key': "c55851da8c4a4546a1d3541feb1cdd46",
        'q': "movies",
        'begin_date': "20170101",
        'end_date': "20180101"
        });
        return url
    }
 $.ajax({
   url: getUrl(),
   method: 'GET',
 }).done(function(result) {
    var docs = result.response.docs,
        thisDoc,
        title,
        author,
        pubDate,
        url;

    for (var i =0; i < docs.length; i++)
    {
        thisDoc = docs[i];
        title = thisDoc.headline.main;
        author = thisDoc.byline.original;
        pubDate = thisDoc.pubDate;
        url = thisDoc.web_url;
    }
 }).fail(function(err) {
   throw err;
 });

});

