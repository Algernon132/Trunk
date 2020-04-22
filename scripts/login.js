function login(){
    var serverAddress = "http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users/login"
    
        $.post(serverAddress,{/*write data here*/}).done(function(data){
            alert(JSON.stringify(data));
        });
    }