function register(){
    var serverAddress = "http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users/register"
    console.log("register fired");
        $.post(serverAddress,{email: "4@email.com", name: "Chaz4",password: "password4", password2:"password4"}).done(function(data){
            //add test to make sure userID is legit
            setCredentials(data.id);
        });
    }