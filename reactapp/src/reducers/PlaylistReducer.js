export default function(finalPlaylist=[], action){
    if(action.type == 'setPlaylist'){
        var finalPlaylistCopy = finalPlaylist;
        finalPlaylistCopy = action.reduxPlaylist
      return finalPlaylistCopy
  } else {
      return finalPlaylist
  }
  }