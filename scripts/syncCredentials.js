function setCredentials(userID){
    chrome.storage.sync.set({'userID': userID},function(){
        console.log("UserID set.");
        console.log(userID);
    })
}

async function getCredentials(){
    console.log("retrieving creds");
    chrome.storage.sync.get("userID", function(result) {
        if('userID' in result){
            console.log(result.userID);
            return JSON.stringify(result.userID); 
        }else{
            console.log("Failed to retrieve credentials");
            return null;
        }
      });
      //these are asynchronous, will have to account for that when using their values
      //the functions themselves always return undefined. Only callback functions return real values
}
