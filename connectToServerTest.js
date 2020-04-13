function connectToServerTest(){
    var connectionString = "http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users/login";

    $.get(connectionString).done(function(data){
        alert(data);
    });
}