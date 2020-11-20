export default function(hostId= "", action){
  if(action.type == 'addId'){
    return action.hostId
} else {
    return hostId
}
}