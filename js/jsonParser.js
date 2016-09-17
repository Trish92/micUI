var a = {};
$.getJSON('./data/articles.json', function (data) {
    a = data;
    $.each(a, function(idx, elem){
        var htmlString =
            '<tr>' +
                '<td><img src="'+elem.image +'"/>'+elem.title +'</td>' + // unpublished article header
                '<td>'+elem.profile.first_name+' '+elem.profile.last_name +'</td>' + //author
                '<td>'+elem.words +'</td>' + // words
                '<td>'+elem.publish_at+'</td>' + //submitted time
            '</tr>';
        $('table#tbl TBODY').append(htmlString);
    });
});