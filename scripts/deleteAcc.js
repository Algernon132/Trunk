function deleteAcc(){
    var serverAddress = "http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users/deleteAcc"
    
        $.post(serverAddress,{/*write data here*/}).done(function(data){
            alert(JSON.stringify(data));
        });
    }