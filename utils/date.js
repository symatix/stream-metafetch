module.exports = function(){
    var y = new Date().getFullYear();
    var m = new Date().getMonth() + 1;
    var d = new Date().getDay();

    if (m < 10) m = `0${m}`;
    if (d < 10) d = `0${d}`;

    return `${y}_${m}_${d}`
}