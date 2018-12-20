define(function() {
    var url = location.search;
    if (url.indexOf('?') != -1) {
        url = url.substr(1)
    }
    var barr = url.split('&');
    var target = {};
    barr.forEach(function(item) {
        var sarr = item.split('=');
        target[sarr[0]] = sarr[1]
    })
    return target
})