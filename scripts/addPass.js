function addPass(nameField,urlField,usernameField,passwordField){
    var serverAddress = "http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users/addAcc"
        $.post(serverAddress,{userID: getCredentials(),name: nameField, url: urlField, accUsername: usernameField, accPassword: passwordField}).done(function(data){
            alert(JSON.stringify(data));
        });
    }

window.onload=function(){
    $("#submitPassButton").click(function(){
        console.log("submitPassword onclick fired");
        var name = document.getElementById("name").value;
        var url = document.getElementById("site").value;  //url
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        addPass(name,url,username,password);
    });
};