export default function(name="", action){
    if(action.type === "setting") {
        var nameCopy = name;
        nameCopy = action.eventName;
        console.log(nameCopy)
        return nameCopy
    }else{
        return name;
    }
}