export default function(ID="", action){
    if(action.type === "setID") {
        var IDCopy = ID
        IDCopy = action.eventsID
        return IDCopy
    }else{
        return ID;
    }
}