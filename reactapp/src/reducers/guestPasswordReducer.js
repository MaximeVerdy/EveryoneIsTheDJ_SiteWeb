export default function(guestPassword="", action){
    if(action.type == 'settingPassword'){
        var guestPasswordCopy = guestPassword;
        guestPasswordCopy = action.GuestPassword
      return guestPasswordCopy
  } else {
      return guestPassword
  }
  }