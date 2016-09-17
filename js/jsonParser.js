var a = {};
$.getJSON('./data/articles.json', function (data) {
    a = data;

    $.each(a, function(idx, elem){
        $('table#tbl TBODY').append('<tr><td>'+elem.id+'</td><td>'+elem.title +'</td><td>'+elem.shares +'</td><td>'+elem.views  +'</td><td>'+elem.image +'</td><td>'+elem.url +'</td><td>'+elem.words +'</td><td>'+elem.profile +'</td></tr>');
    });
});