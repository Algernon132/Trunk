function getAllAcc(){
    var serverAddress = "http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users/getallacc"
    
        $.post(serverAddress,{userID: getCredentials()}).done(function(data){
            alert(JSON.stringify(data));
        });
    }