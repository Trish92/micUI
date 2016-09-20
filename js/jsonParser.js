var a = {};
var currentCounter=0;
var articlesData = [];
var articlesVisited = {};
var numOfArticles;
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


function init() {
    $.getJSON('./data/articles.json', function (data) {
        articlesData = data;
    }).then( function () {
        numOfArticles = articlesData.length;
        showData();
        applyLastTableSortOrder();
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
            '<td data-value="'+elem.publish_at+'" class="sortableColumn">'+getFormattedDate(elem.publish_at)+'</td>' + //submitted time
            '</tr>';
        $('table#tbl TBODY').append(htmlString);
    }
    document.getElementById('articleCount').innerHTML = numOfArticles;
    currentCounter = i;
}

function loadMore() {
    showData();
}

function getFormattedDate( dateAsString ) {
    var publishedDate = new Date( dateAsString );
    return publishedDate.getDay() + " " + monthNames[publishedDate.getMonth()] + " " + publishedDate.getFullYear() + ", " + getTimeOfDay(publishedDate.getHours()) ;// + ":" + publishedDate.getMinutes();
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

function getTimeOfDay(time) {
    if( time == 12 ){
        return time + " PM";
    }else if(time<12)
        return time + " AM";
    else
        return (time - 12) + " PM";
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function applyLastTableSortOrder() {
    var sortOrder = getCookie('col').slice(1).split(',');
    sortTable(document.getElementById('tbl'), parseInt(sortOrder[0]), parseInt(sortOrder[1]) );
}