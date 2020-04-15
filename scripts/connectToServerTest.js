function connectToServerTest(){
var serverAddress = "http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users/login"

    $.post(serverAddress,{email : "test@email.com", password: "password"}).done(function(data){
        alert(data);
    });
}