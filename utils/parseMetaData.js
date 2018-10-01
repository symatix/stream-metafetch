module.exports = function(str){
    var metadata = str.substring(13).split(";");
    metadata = metadata[0].substring(0, metadata[0].length-1).split(" - ");
        
    return {
        artist: metadata[0],
        title: metadata[1]
    }
}