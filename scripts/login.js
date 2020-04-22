function login(){
    var serverAddress = "http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users/login"
    
        $.post(serverAddress,{username: "test@email.com", password:"password1"}).done(function(data){
            alert(JSON.stringify(data));
            google.sync
        });
    }