var a = {};
$.getJSON('./data/articles.json', function (data) {
    a = data;

    $.each(a, function(idx, elem){
        $('table#tbl TBODY').append('<tr style="background-color:#f8f6f8;"><td>'+elem.id+'</td><td style="background-color:#f8f6f8;">'+elem.title +'</td><td>'+elem.shares +'</td><td>'+elem.views  +'</td><td>'+elem.image +'</td><td>'+elem.url +'</td><td>'+elem.words +'</td><td>'+elem.profile +'</td></tr>');
    });
});