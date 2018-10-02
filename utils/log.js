module.exports = function(err,station, metadata){
    let {artist, title} = metadata;
    let data;

    if(!artist && title) data = title;
    if (artist && !title) data = artist;
    if (!artist && !title) data = "Data not present";
    if (artist && title) data = `${artist} - ${title}`
    if (err) data = err;
    
    return `${new Date().toLocaleTimeString()} ==> ${station} => [${data}]`
}