function sortTable(table, col, reverse) {
    var tb = table.tBodies[0],
        tr = Array.prototype.slice.call(tb.rows, 0),
        i;
    reverse = -((+reverse) || -1);
    if(col === 2){
        tr = tr.sort(function (a, b) {
            if( parseFloat(a.cells[col].textContent.trim()) < parseFloat(b.cells[col].textContent.trim())){
                return reverse * -1;
            }else
                return reverse * 1;
        });
    }else{
        tr = tr.sort(function (a, b) {
            return reverse
                * ( a.cells[col].getAttribute('data-value')
                        .localeCompare(b.cells[col].getAttribute('data-value') )
                );
        });
    }
    for(i = 0; i < tr.length; ++i) tb.appendChild(tr[i]);

}

function makeSortable(table) {
    var th = table.tHead, i;
    th && (th = th.rows[0]) && (th = th.cells);
    if (th)
        i = th.length;
    else
        return;
    while (--i >= 2) (function (i) { // since we are only sorting last 2 columns
        var dir = 1;
        th[i].addEventListener('click', function () {sortTable(table, i, (dir = 1 - dir))});
    }(i));
}

function makeAllSortable(parent) {
    parent = parent || document.body;
    var t = parent.getElementsByTagName('table'), i = t.length;
    while (--i >= 0) makeSortable(t[i]);
}
