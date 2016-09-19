var a = {};
var currentCounter=0;
var articlesData = [];
var articlesVisited = {};
var numOfArticles;

function init() {
    $.getJSON('./data/articles.json', function (data) {
        articlesData = data;
    }).then( function () {
        numOfArticles = articlesData.length;
        showData();
    });
    articlesVisited.articles = true;
    makeAllSortable();
}

function showData() {
    if(currentCounter === articlesData.length){
        if(!articlesVisited.hasOwnProperty("moreArticles")){
            getMoreData();
        }else {
            alert("No more articles");
        }
        return;
    }
    var i ;
    for(i=currentCounter; i<currentCounter+10;i++){
        var elem = articlesData[i];
        var htmlString =
            '<tr>' +
            '<td><img src="'+elem.image +'"/><div class="unPublishedArticle">'+elem.title +'</div></td>' + // unpublished article header
            '<td class="authorName">'+elem.profile.first_name+' '+elem.profile.last_name +'</td>' + //author
            '<td class="sortableColumn">'+elem.words+'</td>' + // words
            '<td class="sortableColumn">'+elem.publish_at+'</td>' + //submitted time
            '</tr>';
        $('table#tbl TBODY').append(htmlString);
    }
    document.getElementById('articleCount').innerHTML = numOfArticles;
    currentCounter = i;
}

function loadMore() {
    showData();
}

function getMoreData() {
    $.getJSON('./data/more-articles.json', function (data) {
        articlesData = data;
    }).then( function () {
        numOfArticles = numOfArticles + articlesData.length;
        articlesVisited.moreArticles = true;
        showData();
    });
    //reset current counter
    currentCounter = 0;
}