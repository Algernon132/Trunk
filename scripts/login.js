function login(){
    var serverAddress = "http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users/login"
    
        $.post(serverAddress,{username: "5@email.com", password:"password5"}).done(function(data){
            console.log("login fired");
            //verify id before setting
            window.alert(JSON.stringify(data));
        });
    }