function getAllAcc(){
    let serverAddress = "http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users/getallacc"
    let userID = "5eab2f96d4b18c04c7acd561";

    console.log("retrieving creds");
    chrome.storage.sync.get("userID", function(result) {
        if('userID' in result){
            console.log(result.userID);
            $.post(serverAddress,{userID: result.userID}).done(function(data){
            console.log(data);
        });
        }else{
            console.log("Failed to retrieve credentials");
        }
      });
    }