function register(formEmail, formName, formPassword){
    var serverAddress = "http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users/signup";
    console.log("register fired");

        $.post(serverAddress,{email: formEmail, name: formName,password: formPassword}).done(function(data){
            //add test to make sure userID is legit
            if('id' in data){
                console.log(JSON.stringify(data));
                setCredentials(data.id);
                window.location.href = "/popup.html";
            }else if('error' in data){
                console.log(data.error);
                alert(data.error);
            }else{
                console.log(JSON.stringify(data));
                alert("Unknown error occurred");
            }
            
        });
    }