
//Will want to get some sort of encryption or something on the user data
function setCredentials(userID){
    chrome.storage.sync.set({'userID': userID},function(){
        console.log("UserID set.");
        console.log(userID);
    })
}

function getCredentials(){
    console.log("retrieving creds");
    chrome.storage.sync.get("userID", function(result) {
        if('userID' in result){
            console.log(result.userID);
            return result.userID; 
        }else{
            return null;
        }
      });
      //these are asynchronous, will have to account for that when using their values

}
