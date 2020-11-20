export default function(guestID="", action){
    if(action.type == 'setID'){
        var guestIDCopy = guestID;
        guestIDCopy = action.GuestID
      return guestIDCopy
  } else {
      return guestID
  }
  }