export default function(password="", action){
    if(action.type === "set") {
        var passwordCopy = password;
        passwordCopy = action.eventsPass;
        return passwordCopy;
    }else{
        return password;
    }
}